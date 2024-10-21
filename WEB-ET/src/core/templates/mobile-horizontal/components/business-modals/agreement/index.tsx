import { useRef, useState, useEffect } from 'react'

import _ from 'lodash'
import Overlay from '@base-ui/components/overlay'
import Background from '@base-ui/components/background'
import style from './style.module.scss'
import Button from '@shadow/components/button'
import { IProps } from './types'
import Contents from './contents'
export default ({ onStutas, onClose }: IProps) => {
  const contentRef = useRef<any>(null)
  const [isMaxHeight, setIsMaxHeight] = useState<any>(false)

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight,
  )
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const onScrollContent = () => {
    contentRef.current.scrollTo({
      top: isMaxHeight ? 0 : contentRef.current?.scrollHeight,
      behavior: 'smooth',
    })
    setTimeout(() => setIsMaxHeight(!isMaxHeight), 800)
  }

  const onScrollReset = (event: any) => {
    if (event.target.scrollTop < 500) {
      setIsMaxHeight(false)
      return
    }
    if (event.target.scrollTop > contentRef.current?.scrollHeight - 500) {
      setIsMaxHeight(true)
    }
  }

  return (
    <Overlay display={isLandscape} zIndex={98}>
      <Background
        className={style['panel-container']}
        src={require('./i/agreement-bg.png?format=webp')}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={style['close']} onClick={onClose}>
          <img src={require('./i/close.png?format=webp')} />
        </div>
        <div
          className={style['arrow']}
          onClick={_.throttle(onScrollContent, 800, { trailing: false })}
        >
          <img
            src={
              isMaxHeight
                ? require('./i/arrow-up.png?format=webp')
                : require('./i/arrow-down.png?format=webp')
            }
          />
        </div>
        <div className={style['title']}>{$t('网站协议和隐私政策')}</div>
        <div
          className={style['content']}
          ref={contentRef}
          onScroll={_.throttle(onScrollReset, 800)}
        >
          <Contents />
          {onStutas && (
            <div className={style['accept-btn']}>
              <Button
                size="md"
                onClick={() => {
                  onStutas()
                  onClose()
                }}
              >
                {$t('接受')}{' '}
              </Button>
            </div>
          )}
        </div>
      </Background>
    </Overlay>
  )
}
