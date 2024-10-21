/*
 * @Date: 2024-08-20 16:37:02
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useAnnouncement.ts
 * @Description:
 */
import { useState } from 'react'
import useDashBoardBase, { ICommonQuerys } from './dashboard/useBase'
import useGlobal from './useGlobal'
interface IQuery extends ICommonQuerys {
  sort: string
}

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const [detail, setDetail] = useState<any>()

  const getAnnouncementDetail = (id: number) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `api/notice/${id}`,
        cache: { forward: false, expires: 10 },
        cb: (res) => {
          setDetail(res.data)
        },
      }),
    )
  }

  const search = (params, append) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `api/notice/list?page=${params.pageNo}&per_page=${params.pageSize}&sort=${params.sort}`,
        cache: { forward: true, expires: 10 },
        cb: (res) => {
          base.setResponse({
            count: res.data.count || 0,
            data: res.data.list || [],
            append,
          })
        },
      }),
    )
  }

  const conditions: IQuery = {
    sort: '-istop,-sendtime',
    pageNo: 1,
    pageSize: 10,
  }

  const base = useDashBoardBase({
    search,
    conditions,
  })

  return {
    ...base,
    getAnnouncementDetail,
    detail,
    setDetail,
  }
}
