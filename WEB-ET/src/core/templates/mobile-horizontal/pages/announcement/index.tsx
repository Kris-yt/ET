/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/announcement/index.tsx
 * @Description:
 */

import { useEffect, useState } from 'react'
import Panel, { PanelMiniBoard } from '@templates/components/panel/index'
import PanelButton from '@shadow/components/panel/button'
import InfiniteScroll from 'react-infinite-scroll-component'
import _ from 'lodash'
import useAnnouncement from '@/core/hooks/useAnnouncement'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import useGlobal from '@/core/hooks/useGlobal'
export default () => {
  const { useSelector } = useGlobal()
  const navigate = useNavigate()
  const {
    doQuery,
    data,
    recordsCount,
    detail,
    loadMore,
    getAnnouncementDetail,
  } = useAnnouncement()

  useEffect(() => {
    doQuery()
  }, [])
  const userId = useSelector((state) => state.user.info?.userid)
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true) // 用于跟踪是否是初次加载
  const isAuth = userId?.toString() !== undefined && userId?.toString() !== ''
  const handleButtonClick = (activeId: number) => {
    if (activeButton === activeId) return
    setActiveButton(activeId)
    getAnnouncementDetail(activeId)
    doQuery()
  }

  useEffect(() => {
    if (isInitialLoad && data && data.length > 0) {
      const firstMessage = data[0] as { id: number }
      handleButtonClick(firstMessage.id)
      setIsInitialLoad(false) // 标记为已加载
    }
  }, [data, isInitialLoad])

  return (
    <Panel
      title="Announcement"
      type="modal"
      onClose={() => navigate('/home')}
      defalutBackPath="/home"
      display
    >
      <div className={`${style['announcement']}`}>
        <div className={`${style['left-box']}`}>
          <div className={`${style['item-list']}`} id="scrollableDiv">
            {data && data.length > 0 && (
              <InfiniteScroll
                dataLength={data.length}
                next={loadMore}
                hasMore={data.length < recordsCount}
                loader={<></>}
                scrollableTarget="scrollableDiv"
              >
                {data.map((item: any) => (
                  <PanelButton
                    state={activeButton === item.id ? 'checked' : 'unchecked'}
                    className={`${style['tab']}`}
                    key={item.id}
                    onClick={() => handleButtonClick(item.id)}
                  >
                    <span>{item.title}</span>
                    {isAuth && item.is_read === false && (
                      <div className={`${style['unread']}`}></div>
                    )}
                  </PanelButton>
                ))}
              </InfiniteScroll>
            )}
          </div>
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
                  {(detail as { created_at: string }).created_at}
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
    </Panel>
  )
}
