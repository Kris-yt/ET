import MiniPanel from '@shadow/components/mini-panel'
import style from './style.module.scss'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import useSendPhoneCode, {
  ESendPhoneCodeFlag,
} from '@/core/hooks/useSendPhoneCode'
import useBindPhoneNumber from '@/core/hooks/user-account/useBindPhoneNumber'
import { BindPhoneProps } from './types'
export default ({ visible, setVisible }: BindPhoneProps) => {
  const handleClose = () => {
    sendCodeFormik.values.phoneNumber = ''
    setVisible(false)
  }
  const {
    countdown,
    sendPhoneCode,
    formik: sendCodeFormik,
  } = useSendPhoneCode({ flag: ESendPhoneCodeFlag.bind })

  const { formik, bindPhoneNumber } = useBindPhoneNumber({
    onScuccess: handleClose,
  })

  return (
    <MiniPanel
      title={'Bind number'}
      zIndex={11}
      display={visible}
      onClose={() => setVisible(false)}
    >
      <div className={style['bindNumberContainer']}>
        <div className={style['bindNumber-item']}>
          <InputText
            name="phoneNumber"
            value={sendCodeFormik.values.phoneNumber}
            onChange={(value) => {
              sendCodeFormik.handleChange({
                target: { name: 'phoneNumber', value },
              })
            }}
            placeholder="Mobile number(09*********)"
          />
        </div>
        <div className={style['bindNumber-item']}>
          <InputText
            name="code"
            value={formik.values.code}
            onChange={(value) =>
              formik.handleChange({ target: { name: 'code', value } })
            }
            placeholder="Please enter code"
            rightNode={
              <span
                className={`${style.checkcode} ${countdown === 0 ? '' : style.disabled}`}
                onClick={() => sendPhoneCode(sendCodeFormik.values.phoneNumber)}
              >
                {countdown || 'send'}
              </span>
            }
          />
        </div>
        <div className={style['bindNumber-item']}>
          <Button
            onClick={() => {
              sessionStorage.setItem(
                'bindedPhoneNumber',
                JSON.stringify({ num: sendCodeFormik.values.phoneNumber }),
              )
              bindPhoneNumber()
            }}
            disabled={!(sendCodeFormik.isValid && formik.isValid)}
          >
            {$t('确定')}
          </Button>
        </div>
      </div>
    </MiniPanel>
  )
}
