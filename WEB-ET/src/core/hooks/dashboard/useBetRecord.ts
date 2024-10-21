/*
 * @Date: 2024-08-10 15:09:11
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useBetRecord.ts
 * @Description:
 */
import dayjs from 'dayjs'
import { useState } from 'react'
import { useMount } from 'react-use'
import useGlobal from '../useGlobal'
import useBase, { ICommonQuerys } from './useBase'
import useThridPlatforms from './useThridPlatforms'
import { DEFAULT_DATE_UNIT, SEARCH_DATE_FORMAT } from '@utlis/formatData'
import { ERequestMethods } from '@/core/middleware/types.d'

interface IQuery extends ICommonQuerys {
  userid: number
  starttime: string
  endtime: string
  status: string
  platform?: string
}
interface IGetThirdBetDetail {
  id: string
  platform: string
}
interface IProps {
  start?: string
  end?: string
  shouldGetThirdPlatforms?: boolean
}
export default ({ start, end, shouldGetThirdPlatforms = true }: IProps) => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const userInfo = useSelector((state) => state.user.info)
  const { getThirdPlatforms, platforms } = useThridPlatforms()
  const [detail, setDetail] = useState<Record<string, any> | null>(null)

  if (shouldGetThirdPlatforms) useMount(getThirdPlatforms)

  const conditions: IQuery = {
    userid: userInfo?.userid || 0,
    starttime:
      start || dayjs().startOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    endtime: end || dayjs().endOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    platform: '',
    status: '0',
    pageNo: 1,
    pageSize: 10,
  }

  const search = (params: IQuery, append) => {
    const { userid, starttime, endtime, status, pageNo, pageSize, platform } =
      params
    const uri = `gameinfo/allProjectsNew?isgetdata=1&userid=${userid}&startDate=${starttime}&endDate=${endtime}&platform=${platform}&ischild=0&p=${pageNo}&pn=${pageSize}&bet_result=${status}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        loading: true,
        apiType: 'classic',
        picks: ['aProject->data'],
        cb: (res) => {
          base.setResponse({
            count: res.recordsCount || 0,
            data: res.data?.list || [],
            append,
          })
        },
      }),
    )
  }

  const getThirdBetDetail = ({ id, platform }: IGetThirdBetDetail) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/game/projectDetail',
        method: ERequestMethods.POST,
        data: { project_id: id, platform },
        cb: (res: any) => {
          setDetail(res.data)
        },
      }),
    )
  }

  const base = useBase({
    search,
    conditions,
  })

  return {
    ...base,
    platforms,
    detail,
    getThirdBetDetail,
  }
}
