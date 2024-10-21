/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/message-center/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
import Panel, { PanelMiniBoard } from '@templates/components/panel/index'
import PanelButton from '@shadow/components/panel/button'
import useMessage from './useMessage'
import style from './style.module.scss'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Background from '@base-ui/components/background'

export default () => {
  const {
    total, // 总数
    // pageSize,  // 每页显示条数
    messageList,
    getMessageList,
    detail, // 详情
    getMessageDetail, // 获取详情
    deleteMessageByIds, // 通过IDS删除
    loadMore,
    setDetail,
    // deleteMessageAll
  } = useMessage()
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true) // 用于跟踪是否是初次加载
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [checkboxList, setCheckboxList] = useState([])
  const navigate = useNavigate()

  useMount(getMessageList)

  const handleButtonClick = (activeId: number) => {
    if (activeButton === activeId) return
    setActiveButton(activeId)
    getMessageDetail(activeId)
    getMessageList()
  }

  const handleSelect = () => {
    setIsOpenSelect(true)
  }

  const handleBack = () => {
    setIsOpenSelect(false)
    setCheckboxList([])
  }

  const handleDelete = () => {
    deleteMessageByIds(checkboxList)
    setIsOpenSelect(false)
    setCheckboxList([])
    setDetail(null)
  }

  const handleCheckbox = (id: number) => {
    setCheckboxList((prev: any) => {
      if (prev.includes(id)) {
        return prev.filter((item: number) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  useEffect(() => {
    if (isInitialLoad && messageList?.length > 0) {
      const firstMessage = messageList[0] as { id: number }
      handleButtonClick(firstMessage.id)
      setIsInitialLoad(false) // 标记为已加载
    }
  }, [messageList, isInitialLoad])

  return (
    <Panel
      title="Message"
      type="modal"
      onClose={() => {
        navigate('/home')
      }}
      display
    >
      <div className={`${style['message-center']}`}>
        <div className={`${style['left-box']}`}>
          <div className={`${style['item-list']}`} id="scrollableDiv">
            {messageList?.length > 0 && (
              <InfiniteScroll
                dataLength={total}
                next={loadMore}
                hasMore={messageList.length < total}
                loader={<></>}
                scrollableTarget="scrollableDiv"
              >
                {messageList.map((item: any) => (
                  <PanelButton
                    state={activeButton === item.id ? 'checked' : 'unchecked'}
                    className={`${style['tab']}`}
                    key={item.id}
                    onClick={() => handleButtonClick(item.id)}
                  >
                    <span>{item.title}</span>
                    {item.is_unread === true && (
                      <div className={`${style['unread']}`}></div>
                    )}
                    {isOpenSelect && (
                      <div
                        className={`${style['checkbox']} ${_.includes(checkboxList, item.id) ? style['active'] : ''}`}
                        onClick={() => handleCheckbox(item.id)}
                      ></div>
                    )}
                  </PanelButton>
                ))}
              </InfiniteScroll>
            )}
          </div>
          {messageList?.length > 0 && (
            <div className={`${style['select-btn']}`}>
              {isOpenSelect ? (
                <>
                  <div onClick={handleBack}>Back</div>
                  <div onClick={handleDelete}>Delete</div>
                </>
              ) : (
                <div onClick={handleSelect}>Select</div>
              )}
            </div>
          )}
        </div>
        <PanelMiniBoard>
          <div className={`${style['content-box']}`}>
            {detail ? (
              <>
                <div className={`${style['title']}`}>
                  {(detail as { title: string }).title}
                </div>
                <div
                  className={`${style['text']}`}
                  dangerouslySetInnerHTML={{
                    __html: _.replace(
                      (detail as { content: string }).content,
                      /(<br>|<br\/>)/g,
                      '',
                    ),
                  }}
                ></div>
                <div className={`${style['time']}`}>
                  {(detail as { sent_at: string }).sent_at}
                </div>
              </>
            ) : (
              <div className={`${style['no-data']}`}>
                <div className={`${style['no-data-img']}`}></div>
                <span>No data...</span>
              </div>
            )}
          </div>
        </PanelMiniBoard>
      </div>
      <Background
        className={`${style['grass']}`}
        src={require('./i/grass.png?format=webp')}
      ></Background>
      <Background
        className={`${style['left-decoration']}`}
        src={require('./i/left-decoration.png?format=webp')}
      ></Background>
    </Panel>
  )
}
