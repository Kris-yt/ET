/*
 * @Date: 2024-08-07 17:40:14
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/message-center/useMessage.ts
 * @Description:
 */
import { useState } from 'react'
import useGlobal from '@/core/hooks/useGlobal'

export default () => {
  const pageSize = 10
  const { dispatch, ACTIONS } = useGlobal()
  const [messageList, setMessageList] = useState<Array<any>>([])
  const [detail, setDetail] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  /**
   * @description: 获取消息列表
   * @param page 页数
   * @param append 是否追加
   */
  const getMessageList = (page = currentPage, append = false) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `api/message/list?page=${page}&per_page=${pageSize}`,
        cb: (res) => {
          if (append) {
            setMessageList([...(messageList || []), ...(res.data?.list || [])])
          } else {
            setMessageList(res.data?.list || [])
          }
          setTotal(res.data?.count ?? 0)
        },
      }),
    )
  }

  /**
   * @description: 获取消息详情
   * @param id
   */
  const getMessageDetail = (id: number) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `api/message/${id}`,
        cb: (res) => {
          setDetail(res.data)
        },
      }),
    )
  }

  /**
   * @description: 删除消息
   * @param ids
   */
  const deleteMessageByIds = (ids: string[]) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `?controller=user&action=messages&tag=deleteselect`,
        apiType: 'classic',
        method: 'POST',
        data: {
          checkboxes: ids,
        },
        cb: () => {
          setCurrentPage(1)
          getMessageList(1)
        },
      }),
    )
  }

  const deleteMessageAll = () => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: `user/messages?tag=deleteall`,
        apiType: 'classic',
        cb: () => {
          setCurrentPage(1)
          getMessageList(1)
        },
      }),
    )
  }

  const loadMore = () => {
    if (messageList.length < total) {
      setCurrentPage(currentPage + 1)
      getMessageList(currentPage + 1, true)
      return
    }
  }

  return {
    total,
    pageSize,
    messageList,
    getMessageList,
    detail,
    getMessageDetail,
    deleteMessageByIds,
    deleteMessageAll,
    loadMore,
    setDetail,
  }
}
