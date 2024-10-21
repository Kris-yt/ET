/*
 * @Date: 2024-08-10 09:50:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useActivityReward.ts
 * @Description:
 */
import { useState } from 'react'
import dayjs from 'dayjs'
import useBase, { ICommonQuerys } from './useBase'
import useGlobal from '../useGlobal'
import { DEFAULT_DATE_UNIT, SEARCH_DATE_FORMAT } from '@utlis/formatData'
import { ERequestMethods } from '@/core/middleware/types.d'

interface IQuery extends ICommonQuerys {
  starttime: string
  filter_rewards: string
  endtime: string
}

interface IAccountChange {
  start?: string
  end?: string
}
export default ({ start, end }: IAccountChange) => {
  const { dispatch, ACTIONS } = useGlobal()
  const [meta, setMeta] = useState({
    total_pending_amount: 0,
    total_redeem_amount: 0,
    total_pages: 0,
    total: 0,
  })

  const conditions: IQuery = {
    starttime:
      start || dayjs().startOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    endtime: end || dayjs().endOf(DEFAULT_DATE_UNIT).format(SEARCH_DATE_FORMAT),
    filter_rewards: '',
    pageNo: 1,
    pageSize: 10,
  }

  const putReward = (itme: any, querys: any) => {
    if (itme.operation !== '领取') return
    const uri = `api/activity/reward/${itme.id}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        method: ERequestMethods.PUT,
        cb: (res) => {
          if (res.status == 10000) {
            dispatch(
              ACTIONS.BASE.openToast({ type: 'success', text: res.message }),
            )
            search(querys, false)
          } else if (res.status == 365) {
            dispatch(
              ACTIONS.BASE.openToast({ type: 'error', text: res.message }),
            )
          } else {
            dispatch(
              ACTIONS.BASE.openToast({ type: 'error', text: res.message }),
            )
          }
        },
      }),
    )
  }

  const search = (params: IQuery, append) => {
    const { starttime, endtime, filter_rewards, pageNo, pageSize } = params
    const uri = `api/activity/reward?start=${starttime}&end=${endtime}&filter_rewards=${filter_rewards}&page=${pageNo}&per_page=${pageSize}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        loading: true,
        cb: (res) => {
          setMeta(res.data.meta)
          base.setResponse({
            count: res.data.meta.total || 0,
            data: res.data.data || [],
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
    meta,
    putReward,
  }
}
