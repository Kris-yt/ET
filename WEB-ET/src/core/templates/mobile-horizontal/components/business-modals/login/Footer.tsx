import { useState } from 'react'
import Button from '@shadow/components/button'
import Agreement from '@templates/components/business-modals/agreement'
import style from './style.module.scss'

export default ({ submit, formik, btnName }) => {
  const [modal, setModal] = useState<boolean>(false)
  const [status, setStatus] = useState(false)

  const onHandleSubmit = () => {
    if (!status) {
      setModal(true)
    } else {
      submit()
    }
  }

  const onHandleModel = () => {
    if (!status) {
      setModal(true)
    } else {
      setStatus(false)
    }
  }
  return (
    <div className={style['footer']}>
      <div className={style['agreement']}>
        <input
          type="checkbox"
          id="agreementCheckbox"
          checked={status}
          onChange={onHandleModel}
        />
        <label htmlFor="agreementCheckbox" onClick={() => setModal(true)}>
          {$t('我同意')}
          <span className={style['withUnderline']}>
            {$t('网站协议和隐私政策')}
          </span>
        </label>
      </div>
      <div className={style['btn']}>
        <Button size="lg" disabled={!formik.isValid} onClick={onHandleSubmit}>
          {btnName}
        </Button>
      </div>
      <div className={style['des']}>
        <img src={require('./i/des.png?format=webp')} />
      </div>
      {modal && (
        <Agreement
          onClose={() => setModal(false)}
          onStutas={() => setStatus(true)}
        />
      )}
    </div>
  )
}
