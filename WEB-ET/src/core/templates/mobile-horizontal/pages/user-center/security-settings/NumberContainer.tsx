import React, { useState } from 'react'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import style from './style.module.scss'

interface NumberContainerProps {
  sendCodeFormik: any
  handleSendCode: (phoneNumber: string) => void
  formik: any
  countdown: number
  successClass: string
  bindPhoneNumber: () => void
  isChangePhone?: boolean
}

const NumberContainer: React.FC<NumberContainerProps> = ({
  sendCodeFormik,
  handleSendCode,
  formik,
  countdown,
  // successClass,
  bindPhoneNumber,
  isChangePhone,
}) => {
  const [isDisabled, setIsDisabled] = useState(false) // 按钮禁用状态
  const [activeClass, setActiveClass] = useState('')
  const handleTouchStart = () =>
    formik.isValid && setActiveClass(style.highlight)
  const handleTouchEnd = () => {
    setActiveClass('')
    bindPhoneNumber()
  }
  const handleClick = () => {
    setIsDisabled(true)
    handleSendCode(sendCodeFormik.values.phoneNumber)
    setTimeout(() => {
      setIsDisabled(false)
    }, 3000)
  }
  return (
    <div className={style['number-container']}>
      {isChangePhone && <p>Please enter new mobile phone number</p>}
      <div>
        <InputText
          name="phoneNumber"
          value={sendCodeFormik.values.phoneNumber}
          onChange={(value) =>
            sendCodeFormik.handleChange({
              target: { name: 'phoneNumber', value },
            })
          }
          placeholder="Mobile number(09*********)"
        />
      </div>
      <InputText
        name="code"
        value={formik.values.code}
        onChange={(value) =>
          formik.handleChange({ target: { name: 'code', value } })
        }
        placeholder="Please enter code"
        rightNode={
          <button
            disabled={isDisabled}
            className={`${style.checkcode} ${countdown === 0 ? '' : style.disabled}`}
            onClick={handleClick}
          >
            {countdown || 'send'}
            {/* <b
              className={`${sendCodeFormik.isValid && formik.isValid ? successClass : ''}`}
            >
              Verification code sent
            </b> */}
          </button>
        }
      />
      <Button
        className={activeClass}
        onTouchStart={handleTouchStart}
        onClick={handleTouchEnd}
        disabled={
          !(sendCodeFormik.isValid && formik.isValid) || !formik.values.code
        }
      >
        {$t('确定')}
      </Button>
    </div>
  )
}

export default NumberContainer
