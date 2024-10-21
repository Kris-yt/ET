/*
 * @Date: 2024-08-10 09:50:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useAccountChange.ts
 * @Description:
 */
import _ from 'lodash'
import { useState, useRef } from 'react'
import dayjs from 'dayjs'
import useBase, { ICommonQuerys } from './useBase'
import useGlobal from '../useGlobal'

interface IQuery extends ICommonQuerys {
  userid: number
  starttime: string
  endtime: string
  ordertype: string
  status: string
}

interface IAccountChange {
  start?: string
  end?: string
}
export default ({ start, end }: IAccountChange) => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const isSetOrderTypes = useRef(false)
  const [orderTypes, setOrderTypes] = useState<any[]>([])
  const userInfo = useSelector((state) => state.user.info)

  const conditions: IQuery = {
    userid: userInfo?.userid || 0,
    starttime: start || dayjs().startOf('days').format('YYYY-MM-DD HH:mm:ss'),
    endtime: end || dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss'),
    ordertype: '0',
    status: '0',
    pageNo: 1,
    pageSize: 10,
  }

  const search = (params: IQuery, append) => {
    const { userid, starttime, endtime, ordertype, status, pageNo, pageSize } =
      params
    const uri = `report/selfbankreport?userid=${userid}&starttime=${starttime}&endtime=${endtime}&ordertype=${ordertype}&status=${status}&p=${pageNo}&pn=${pageSize}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        loading: true,
        apiType: 'classic',
        picks: ['orders->data', 'icount->total', 'ordertypes'],
        cb: (res) => {
          const types = _.map(res.ordertypes, (value) => value)
          if (!isSetOrderTypes.current) {
            isSetOrderTypes.current = true
            setOrderTypes([{ id: 0, cntitle: '类型' }, ...types])
          }
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
    orderTypes,
  }
}
