import React, { useState } from 'react'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import style from './style.module.scss'

interface PasswordContainerProps {
  changePassworkFormik: any
  changePassword: () => void
}
const PasswordContainer: React.FC<PasswordContainerProps> = ({
  changePassworkFormik,
  changePassword,
}) => {
  const [displayPassword, setDisplayPassword] = useState(false)
  const [displayConfirmPassword, setdisplayConfirmPassword] = useState(false)
  const [activeClass, setActiveClass] = useState('')
  const handleTouchStart = () =>
    changePassworkFormik.isValid && setActiveClass(style.highlight)
  const handleTouchEnd = (event) => {
    event.preventDefault() // 阻止点击事件
    setActiveClass('')
    changePassword()
  }
  return (
    <div className={style['password-container']}>
      <InputText
        leftNode={<b className={style['lock']} />}
        name="password"
        value={changePassworkFormik.values.password}
        onChange={(value) =>
          changePassworkFormik.handleChange({
            target: { name: 'password', value },
          })
        }
        placeholder="Please enter password"
        type={displayPassword ? 'text' : 'password'}
        rightNode={
          <span
            className={
              displayPassword
                ? style['eye']
                : style['eye'] + ' ' + style['close']
            }
            onTouchEnd={() => setDisplayPassword(!displayPassword)}
          ></span>
        }
        tips={
          changePassworkFormik.errors.password &&
          changePassworkFormik.touched.password
        }
      />
      <InputText
        leftNode={<b className={style['lock']} />}
        name="confirmPassword"
        value={changePassworkFormik.values.confirmPassword}
        onChange={(value) =>
          changePassworkFormik.handleChange({
            target: { name: 'confirmPassword', value },
          })
        }
        placeholder="Please enter password"
        type={displayConfirmPassword ? 'text' : 'password'}
        rightNode={
          <span
            className={
              displayConfirmPassword
                ? style['eye']
                : style['eye'] + ' ' + style['close']
            }
            onTouchEnd={() =>
              setdisplayConfirmPassword(!displayConfirmPassword)
            }
          ></span>
        }
        tips={
          changePassworkFormik.errors.confirmPassword &&
          changePassworkFormik.touched.confirmPassword
        }
      />
      <Button
        className={activeClass}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleTouchEnd}
        disabled={!changePassworkFormik.isValid}
      >
        {$t('确认')}
      </Button>
    </div>
  )
}

export default PasswordContainer
