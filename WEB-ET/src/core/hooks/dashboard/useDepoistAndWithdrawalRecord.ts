/*
 * @Date: 2024-08-10 15:08:43
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useDepoistAndWithdrawalRecord.ts
 * @Description:
 */
import dayjs from 'dayjs'
import useGlobal from '../useGlobal'
import useBase, { ICommonQuerys } from './useBase'
import { DEFAULT_DATE_UNIT, SEARCH_DATE_FORMAT } from '@utlis/formatData'

interface IQuery extends ICommonQuerys {
  starttime: string
  endtime: string
  status: number
}

interface IProps {
  start?: string
  end?: string
  type: 'deposit' | 'withdrawal'
}
export default ({ start, end, type }: IProps) => {
  const { dispatch, ACTIONS } = useGlobal()

  const conditions: IQuery = {
    starttime:
      start || dayjs().startOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    endtime: end || dayjs().endOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    pageNo: 1,
    pageSize: 10,
    status: 0,
  }

  const search = (params: IQuery, append) => {
    const { starttime, endtime, pageNo, pageSize, status } = params
    const apiType = type === 'deposit' ? 'emailreport' : 'withdrawalreport'
    const picks = type === 'deposit' ? ['result->data'] : ['aProject->data']
    const uri = `report/${apiType}?starttime=${starttime}&endtime=${endtime}&p=${pageNo}&page_size=${pageSize}&status=${status}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        loading: true,
        apiType: 'classic',
        picks,
        cb: (res) => {
          base.setResponse({
            count: res.recordsCount || 0,
            data: res.data || [],
            append,
          })
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
  }
}
