/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/security-settings/index.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobal from '@/core/hooks/useGlobal'
import useBindPhoneNumber from '@/core/hooks/user-account/useBindPhoneNumber'
import useChangePhoneNumber from '@/core/hooks/user-account/useChangePhoneNumber'
import useChangePassword from '@/core/hooks/user-account/useChangePassword'
import useSendPhoneCode, {
  ESendPhoneCodeFlag,
} from '@/core/hooks/useSendPhoneCode'
import MiniPanel from '@shadow/components/mini-panel'
import NumberContainer from './NumberContainer'
import PasswordContainer from './PasswordContainer'
import SMSContainer from './SMSContainer'
import { EKycState } from '@/core/reducers/enum'
import style from './style.module.scss'
import Select from '@shadow/components/select'
import Button from '@shadow/components/button'
import InputArea from '../../../components/input-area'
import useSetphstore from '@/core/hooks/useSetphstore'
export default () => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const userInfo = useSelector<any>((state) => state.user?.info)
  const [showMiniPanel, setShowMiniPanel] = useState(false)
  const [showGamePanel, setShowGamePanel] = useState<boolean>(false)
  const [flag, setFlag] = useState<ESendPhoneCodeFlag>(ESendPhoneCodeFlag.bind)
  const [activeComponent, setActiveComponent] = useState('')
  const [title, setTitle] = useState('')
  const [successClass, setSuccessClass] = useState('')
  const [isSendCode, setIsSendCode] = useState(false)
  const [componentKey, setComponentKey] = useState(0)
  const { storeformik, onSubmit } = useSetphstore()
  const phstorelist = useSelector((state) => state.base.settings?.phstorelist)
  const [_phstorelist, set_phstorelist] = useState([])
  const result = phstorelist?.find(
    (item) => item.id === Number(userInfo?.phstore),
  )
  useEffect(() => {
    filterPhstorelist()
  }, [phstorelist])
  const filterPhstorelist = () => {
    if (phstorelist?.length) {
      const list = phstorelist.map((i) => {
        const o = { label: '', value: '', status: '' }
        o.label = i.name
        o.value = i.id
        o.status = i.status
        return o
      })
      storeformik.setFieldValue('phstore', '')
      set_phstorelist(list)
    }
  }
  const navigate = useNavigate()
  const handleClose = () => {
    setShowMiniPanel(false)
    setActiveComponent('')
    setComponentKey((prevKey) => prevKey + 1)
    verifyCodeformik.values.code = ''
    changePhoneFormik.values.code = ''
    sendCodeFormik.values.phoneNumber = ''
    verifyCodePwdformik.values.code = ''
    changePassworkFormik.values.confirmPassword = ''
    changePassworkFormik.values.password = ''
  }
  const handleGameClose = () => {
    if (userInfo?.phstore === '-1') {
      onSubmit()
    }
    setShowGamePanel(false)
  }
  const handGameopen = () => {
    filterPhstorelist()
    setShowGamePanel(true)
  }
  //绑定手机号
  const { formik, bindPhoneNumber } = useBindPhoneNumber({
    onScuccess: handleClose,
  }) //修改绑定的手机号
  const {
    token,
    verifyCodeformik,
    changePhoneFormik,
    verifyCode,
    changeBindPhoneNumber,
  } = useChangePhoneNumber({ onScuccess: handleClose })
  //绑定手机号验证码
  const {
    countdown,
    sendPhoneCode,
    formik: sendCodeFormik,
  } = useSendPhoneCode({ flag, token })
  //修改绑定手机号，验证原手机号的验证码
  const {
    countdown: VarifyPhoneCountdown,
    sendPhoneCode: VarifyPhonesendPhoneCode,
  } = useSendPhoneCode({ flag: ESendPhoneCodeFlag.updateVerify, token })
  //修改绑定手机号，验证新手机号码
  const {
    countdown: VarifyNewPhoneCountdown,
    sendPhoneCode: VarifyNewPhonesendPhoneCode,
    formik: sendNewCodeFormik,
  } = useSendPhoneCode({ flag: ESendPhoneCodeFlag.update, token })
  //修改密码
  const {
    token: tokenPwd,
    changePassworkFormik,
    changePassword,
    verifyCode: verifyCodePwd,
    verifyCodeformik: verifyCodePwdformik,
  } = useChangePassword({
    onScuccess: () => {
      handleClose()
    },
  })
  //修改密码：验证手机号
  const {
    countdown: VarifyPwdCountdown,
    sendPhoneCode: VarifyPwdsendPhoneCode,
  } = useSendPhoneCode({ flag: ESendPhoneCodeFlag.resetPass, token: tokenPwd })
  const [bindingPhoneInfo, setBindingPhoneInfo] = useState(
    userInfo?.binding_phone_info,
  )
  useEffect(() => {
    if (isSendCode) {
      const updateSuccessClass = (countdown, setClass) => {
        if (countdown > 0) {
          setClass(style.success)
          setTimeout(() => setClass(''), 3000)
        }
      }
      updateSuccessClass(countdown, setSuccessClass)
      updateSuccessClass(VarifyPhoneCountdown, setSuccessClass)
      updateSuccessClass(VarifyNewPhoneCountdown, setSuccessClass)
      updateSuccessClass(VarifyPwdCountdown, setSuccessClass)
      setIsSendCode(false)
    }
  }, [
    countdown,
    VarifyPhoneCountdown,
    VarifyNewPhoneCountdown,
    VarifyPwdCountdown,
  ])
  useEffect(() => {
    setBindingPhoneInfo(userInfo?.binding_phone_info)
    setFlag(
      !bindingPhoneInfo ? ESendPhoneCodeFlag.bind : ESendPhoneCodeFlag.update,
    )
  }, [userInfo])

  useEffect(() => {
    if (token || tokenPwd) {
      setComponentKey((prevKey) => prevKey + 1)
      if (
        flag === ESendPhoneCodeFlag.updateVerify &&
        activeComponent === 'SMS'
      ) {
        //更新绑定的手机号:验证原手机号成功，进入重新绑定手机号流程
        setActiveComponent('ChangeNumber')
        setTitle('Bind number')
        setFlag(ESendPhoneCodeFlag.update)
      }
      if (
        flag === ESendPhoneCodeFlag.resetPass &&
        activeComponent === 'PwdSMS'
      ) {
        setActiveComponent('Password')
        setTitle('Change password')
      }
    }
  }, [token, tokenPwd])

  const handleAction = (component, flagValue, titleValue) => {
    if (component == 'PwdSMS' && !bindingPhoneInfo) {
      //必须先绑定手机号才可以更新密码
      dispatch(
        ACTIONS.BASE.openToast({
          text: $t('请绑定手机号'),
        }),
      )
      return
    }
    if (component == 'Number') {
      sendCodeFormik.values.phoneNumber = formik.values.code = ''
    }
    setComponentKey((prevKey) => prevKey + 1)
    setShowMiniPanel(true)
    setActiveComponent(component)
    setFlag(flagValue)
    setTitle(titleValue)
  }
  const handleSendCode = (phoneNumber) => {
    sendPhoneCode(phoneNumber)
    if (countdown === 0) {
      setIsSendCode(true)
    }
  }
  const handlekyc = () => {
    if (userInfo?.binding_phone_info === '') {
      handleAction('Number', ESendPhoneCodeFlag.bind, 'Bind number')
    } else {
      navigate('/kyc')
    }
  }
  const handlePhstore = (value: any) => {
    storeformik.setFieldValue('phstore', value)
  }
  return (
    <div className={style.wrapper}>
      <div className={`item ${userInfo?.isset_loginpwd ? 'active' : ''}`}>
        <span className="name">Login password</span>
        <span
          className="operate"
          onClick={() =>
            handleAction(
              'PwdSMS',
              ESendPhoneCodeFlag.resetPass,
              'SMS verification',
            )
          }
        >
          {userInfo?.isset_loginpwd ? 'Change Password' : 'Not set'}
        </span>
      </div>
      <div className={`item ${bindingPhoneInfo ? 'active' : ''}`}>
        <span className="name">Phone number</span>
        {!bindingPhoneInfo ? (
          <span
            className="operate"
            onClick={() =>
              handleAction('Number', ESendPhoneCodeFlag.bind, 'Bind number')
            }
          >
            {' '}
            Not set
          </span>
        ) : (
          <span
            className="operate"
            onClick={() =>
              handleAction(
                'SMS',
                ESendPhoneCodeFlag.updateVerify,
                'SMS verification',
              )
            }
          >
            {' '}
            Change
          </span>
        )}
      </div>
      <div className="item" onClick={() => handlekyc()}>
        <span className="name">KYC</span>
        <span className="operate">
          {userInfo?.kyc_status === EKycState.PENDING && 'Under review'}
          {userInfo?.kyc_status === EKycState.FAILED && 'Failed review'}
          {userInfo?.kyc_status === EKycState.SCCUESS && 'Verified'}
          {userInfo?.kyc_status === EKycState.NOT_SUBMIT && 'Not Set'}
        </span>
      </div>
      <div className="item active" onClick={handGameopen}>
        <span className="name">Gaming Venue</span>
        <span className="operate">
          {userInfo?.phstore == '-1' ? 'Not Set' : result?.name}
        </span>
      </div>
      <MiniPanel title={title} display={showMiniPanel} onClose={handleClose}>
        {activeComponent === 'Number' && (
          <NumberContainer
            key={componentKey}
            sendCodeFormik={sendCodeFormik}
            handleSendCode={handleSendCode}
            formik={formik}
            countdown={activeComponent ? countdown : 0}
            successClass={successClass}
            bindPhoneNumber={() => {
              sessionStorage.setItem(
                'bindedPhoneNumber',
                JSON.stringify({ num: sendCodeFormik.values.phoneNumber }),
              )
              bindPhoneNumber()
            }}
          />
        )}
        {activeComponent === 'Password' && (
          <PasswordContainer
            changePassworkFormik={changePassworkFormik}
            changePassword={changePassword}
            key={componentKey}
          />
        )}
        {activeComponent === 'PwdSMS' && (
          <SMSContainer
            key={componentKey}
            verifyCodeformik={verifyCodePwdformik}
            countdown={activeComponent === 'PwdSMS' ? VarifyPwdCountdown : 0}
            sendPhoneCode={() => {
              VarifyPwdsendPhoneCode()
              if (VarifyPwdCountdown == 0) {
                setIsSendCode(true)
              }
            }}
            successClass={successClass}
            bindingPhoneInfo={bindingPhoneInfo}
            verifyCode={verifyCodePwd}
            buttondisplay={true}
          />
        )}
        {activeComponent === 'SMS' && (
          <SMSContainer
            key={componentKey}
            verifyCodeformik={verifyCodeformik}
            countdown={activeComponent ? VarifyPhoneCountdown : 0}
            sendPhoneCode={() => {
              VarifyPhonesendPhoneCode()
              if (VarifyPhoneCountdown == 0) {
                setIsSendCode(true)
              }
            }}
            successClass={successClass}
            bindingPhoneInfo={bindingPhoneInfo}
            verifyCode={verifyCode}
            buttondisplay={true}
          />
        )}
        {activeComponent === 'ChangeNumber' && (
          <NumberContainer
            key={componentKey}
            sendCodeFormik={sendNewCodeFormik}
            handleSendCode={() => {
              VarifyNewPhonesendPhoneCode()
              if (VarifyNewPhoneCountdown == 0) {
                setIsSendCode(true)
              }
            }}
            formik={changePhoneFormik}
            countdown={
              activeComponent === 'ChangeNumber' ? VarifyNewPhoneCountdown : 0
            }
            successClass={successClass}
            bindPhoneNumber={() => {
              sessionStorage.setItem(
                'bindedPhoneNumber',
                JSON.stringify({ num: sendNewCodeFormik.values.phoneNumber }),
              )
              changeBindPhoneNumber()
            }}
          />
        )}
      </MiniPanel>
      <MiniPanel
        title={'Gaming Venue'}
        display={showGamePanel}
        onClose={() => setShowGamePanel(false)}
      >
        <div className={style['store-container']}>
          {userInfo?.phstore == '-1' && (
            <Select
              shape="sharp"
              name="phstore"
              options={_phstorelist}
              value={storeformik.values.phstore}
              onSelected={(value) => handlePhstore(value)}
              placeholder={$t('实体站不能为空')}
              rightNode={
                <img
                  src={require('./i/more.png?format=webp')}
                  style={{ width: 24, height: 24 }}
                />
              }
            />
          )}
          {userInfo?.phstore != '-1' && (
            <InputArea
              value={result?.name}
              shape="rectangle"
              rows={6}
              readOnly={true}
            />
          )}
          <Button className={style['button']} onClick={handleGameClose}>
            {$t('确定')}
          </Button>
        </div>
      </MiniPanel>
    </div>
  )
}
