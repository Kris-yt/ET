/*
 * @Date: 2024-07-31 01:12:23
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/medium-panel/index.tsx
 * @Description:
 */
import Overlay from '@base-ui/components/overlay'
import Background from '@base-ui/components/background'
import type { IProps } from './types'
import configs from './configs'
import style from './style.module.scss'

export default (props: IProps) => {
  const { title, children, className = '', display, onClose } = props

  return (
    <Overlay display={display} zIndex={10}>
      <Background
        className={`${style[configs.sizeClassName]} ${className}`}
        src={configs.backgroundImage}
      >
        <div className={style['close']} onClick={onClose} />
        <div className={`panel-content ${!title ? 'no-head' : ''}`}>
          {title ? (
            <div className="panel-head">
              <div className="title">{title}</div>
            </div>
          ) : null}
          <div className="panel-body">{children}</div>
        </div>
      </Background>
    </Overlay>
  )
}
