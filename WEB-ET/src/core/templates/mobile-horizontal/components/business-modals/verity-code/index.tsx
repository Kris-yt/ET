/*
 * @Date: 2024-10-05 15:43:04
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/verity-code/index.tsx
 * @Description:
 */
import MiniPanel from '@shadow/components/mini-panel'
import style from './style.module.scss'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import useSendPhoneCode, {
  ESendPhoneCodeFlag,
} from '@/core/hooks/useSendPhoneCode'
import useGlobal from '@/core/hooks/useGlobal'
import useChangePhoneNumber from '@/core/hooks/user-account/useChangePhoneNumber'
import type { IProps } from './types'

export default ({
  visible,
  setVisible,
  onSucess,
  verifyType = ESendPhoneCodeFlag.updateVerify,
}: IProps) => {
  const {
    countdown,
    sendPhoneCode,
    formik: sendCodeFormik,
  } = useSendPhoneCode({ flag: verifyType })

  const { useSelector } = useGlobal()
  const { binding_phone_info } = useSelector<any>((state) => state.user?.info)

  const { verifyCode, verifyCodeformik } = useChangePhoneNumber({
    onVerifyCodeScuccess: (token) => {
      verifyCodeformik.values.code = ''
      sendCodeFormik.values.phoneNumber = ''
      setVisible(false)
      onSucess(token)
    },
  })

  return (
    <MiniPanel
      title={'Verification'}
      zIndex={11}
      display={visible}
      onClose={() => setVisible(false)}
    >
      <div className={style['verifyContainer']}>
        <div className={style['verify-item']}>
          <p
            className={style['verify-tips']}
          >{`Please enter the code sent to ${binding_phone_info} `}</p>
        </div>
        <div className={style['verify-item']}>
          <InputText
            name="code"
            value={verifyCodeformik.values.code}
            onChange={(value) =>
              verifyCodeformik.handleChange({ target: { name: 'code', value } })
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
        <div className={style['verify-item']}>
          <Button
            onClick={() => {
              verifyCode()
            }}
            disabled={!(sendCodeFormik.isValid && verifyCodeformik.isValid)}
          >
            {$t('确定')}
          </Button>
        </div>
      </div>
    </MiniPanel>
  )
}
