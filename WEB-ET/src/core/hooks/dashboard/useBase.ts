/*
 * @Date: 2024-08-10 09:37:15
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useBase.ts
 * @Description:
 */
import React from 'react'
import useGlobal from '../useGlobal'
import type { ToPartial } from '@/core/types/utils'

export interface ICommonQuerys {
  pageNo: number
  pageSize?: number
}
export default <T>({
  search,
  conditions,
}: {
  search: (T, append?: boolean) => void
  conditions: T & ICommonQuerys
}) => {
  type TQueryPartial = ToPartial<ICommonQuerys | T>

  const { dispatch, ACTIONS } = useGlobal()
  const pageSize = conditions.pageSize || 10

  const [querys, setQuerys] = React.useState<T & ICommonQuerys>(conditions)
  const [recordsCount, setRecordsCount] = React.useState<number>(0)
  const [totalPage, setTotalPage] = React.useState<number>(0)
  const [data, setData] = React.useState<Record<string, any>[] | null>(null)

  /**
   * @description: 执行查询查询
   * @param fields 查询条件
   */
  const doQuery = (fields?: TQueryPartial, append?: boolean) => {
    setQuerys({
      ...querys,
      pageNo: 1,
      pageSize: conditions.pageSize,
      ...(fields || {}),
    })
    search(
      {
        ...querys,
        pageNo: 1,
        pageSize: conditions.pageSize,
        ...(fields || {}),
      },
      append,
    )
  }

  /**
   * @description: 加载更多
   */
  const loadMore = () => {
    if (totalPage === querys.pageNo) {
      dispatch(
        ACTIONS.BASE.openToast({ type: 'info', text: $t('没有更多数据了') }),
      )
      return
    }
    doQuery({ pageNo: querys.pageNo + 1 }, true)
  }

  /**
   * @description: 设置接口返回数据
   * @param res
   */
  const setResponse = (res: {
    count: number
    data: Record<string, any>[]
    append?: boolean
  }) => {
    setRecordsCount(res.count)
    setTotalPage(Math.ceil(res.count / pageSize))
    if (res.append) {
      setData([...(data || []), ...res.data])
      return
    }
    setData(res.data)
  }

  return {
    // 设置接口返回数据
    setResponse,
    // 设置查询条件
    setQuerys: (field: TQueryPartial) => setQuerys({ ...querys, ...field }),
    // 执行查询
    doQuery,
    // 记录总数
    recordsCount,
    // 总页数
    totalPage,
    // 当前页数
    pageNo: querys.pageNo,
    // 查询条件
    querys,
    // 接口返回列表数据
    data,
    // 加载更多
    loadMore,
  }
}
