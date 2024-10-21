import React, { useState } from 'react'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import style from './style.module.scss'

interface SMSContainerProps {
  sendPhoneCode: () => void
  verifyCodeformik: any
  countdown: number
  successClass: string
  bindingPhoneInfo?: string
  verifyCode: () => void
  buttondisplay?: boolean
}

const SMSContainer: React.FC<SMSContainerProps> = ({
  sendPhoneCode,
  verifyCodeformik,
  countdown,
  // successClass,
  verifyCode,
  bindingPhoneInfo,
  buttondisplay,
}) => {
  const [isDisabled, setIsDisabled] = useState(false) // 按钮禁用状态
  const [activeClass, setActiveClass] = useState('')
  const handleTouchStart = () =>
    verifyCodeformik.isValid && setActiveClass(style.highlight)

  const handleTouchEnd = () => {
    setActiveClass('')
    verifyCode()
  }

  const handleClick = () => {
    setIsDisabled(true)
    sendPhoneCode()
    setTimeout(() => {
      setIsDisabled(false)
    }, 3000)
  }
  return (
    <div className={style['number-container']}>
      {bindingPhoneInfo ? (
        <p>{`Please enter the code sent to ${bindingPhoneInfo} `}</p>
      ) : (
        ''
      )}
      <InputText
        name="code"
        value={verifyCodeformik.values.code}
        onChange={(value) =>
          verifyCodeformik.handleChange({ target: { name: 'code', value } })
        }
        placeholder="Please enter code"
        rightNode={
          <button
            disabled={isDisabled} // 按钮在禁用状态下不可点击
            className={`${style.checkcode} ${countdown === 0 ? '' : style.disabled}`}
            onClick={handleClick}
          >
            {countdown || 'send'}
            {/* <b className={`${successClass}`}>Verification code sent</b> */}
          </button>
        }
      />
      <div className={`${buttondisplay == true ? style.display : style.none}`}>
        <Button
          // className={buttondisplay==true ? 'btn btn-primary' : 'btn btn'}
          onTouchStart={handleTouchStart}
          onClick={handleTouchEnd}
          disabled={!verifyCodeformik.isValid || !verifyCodeformik.values.code}
          className={`${activeClass}`}
        >
          {$t('确认')}
        </Button>
      </div>
    </div>
  )
}

export default SMSContainer
