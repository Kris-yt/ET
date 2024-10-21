/*
 * @Date: 2024-07-31 00:23:47
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/more/index.tsx
 * @Description:
 */
import React from 'react'
import style from './style.module.scss'
import Background from '@base-ui/components/background'
import { MoreItemProps } from './types'
import Disclaimer from '@templates/components/business-modals/disclaimer'
import Agreement from '@templates/components/business-modals/agreement'

export default () => {
  const [agreementModal, setAgreementModal] = React.useState<boolean>(false)
  const [disclaimerModal, setDisclaimerModal] = React.useState<boolean>(false)

  return (
    <>
      <div className={style['more-container']}>
        <Background
          className={style['more-content']}
          tag="ul"
          src={require('./i/more-bg.png?format=webp')}
        >
          <MoreItem
            rightIcon
            content={$t('网站协议和隐私政策')}
            onTouchEnd={() => setAgreementModal(true)}
          />
          <MoreItem
            rightIcon
            content={$t('责任博彩')}
            onTouchEnd={() => setDisclaimerModal(true)}
          />
        </Background>
      </div>
      {agreementModal && <Agreement onClose={() => setAgreementModal(false)} />}
      {disclaimerModal && (
        <Disclaimer onClose={() => setDisclaimerModal(false)} />
      )}
    </>
  )
}

const MoreItem = ({ rightIcon, content = '', onTouchEnd }: MoreItemProps) => {
  return (
    <li className={style['more-item']} onClick={onTouchEnd}>
      <div className={style['left-content']}>
        <img src={require('./i/left-icon.png?format=webp')} alt="" />
        {content}
      </div>
      {typeof rightIcon === 'boolean' ? (
        <div className={style['right-content']}>
          <img src={require('./i/right-icon.png?format=webp')} alt="" />
        </div>
      ) : (
        rightIcon
      )}
    </li>
  )
}
