import _ from 'lodash'
import { useState } from 'react'
import style from './style.module.scss'
import { Iprops } from './types'
import useGlobal from '@/core/hooks/useGlobal'
import { useNavigate } from 'react-router-dom'
import BindPhoneNumber from './bind-phoneNumber'
import VerityCode from '@shadow/components/business-modals/verity-code/index'
import { ESendPhoneCodeFlag } from '@/core/hooks/useSendPhoneCode'

export default ({ page }: Iprops) => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const navigate = useNavigate()
  const [verityCodeModal, setVerityCodeModal] = useState<boolean>(false)
  const [showBindPhoneNumber, setShowBindPhoneNumber] = useState<boolean>(false)

  const { is_binding_phone, withdrawalAccounts, kyc_status } = useSelector<any>(
    (state) => state.user?.info,
  )

  const onFilterLeftImages = (status: boolean) => {
    if (status) {
      return require('./i/ic-left-act.png?format=webp')
    }
    return require('./i/ic-left.png?format=webp')
  }

  const onFilterStatus = () => {
    let status = ''
    let color = ''
    switch (kyc_status) {
      case 0:
        status = $t('待审核')
        color = '#4F96E8'
        break
      case 1:
        status = $t('审核成功')
        color = '#3E881B'
        break
      case 2:
        status = $t('审核失败')
        color = '#EB212D'
        break
      default:
        status = $t('未提交')
        color = '#CE9D7D'
    }
    return { status, color }
  }
  const handleBindAccount = () => {
    if (!is_binding_phone) {
      setShowBindPhoneNumber(true)
      return
    }
    setVerityCodeModal(true)
  }

  return (
    <>
      <div className={style['binding-container']}>
        <h3 className={style['binding-title']}>
          For the safety of your account and funds, you need to complete the
          following
        </h3>
        <ul className={style['binding-list']}>
          <li
            className={is_binding_phone ? style['isBinding'] : ''}
            onClick={() => {
              if (!is_binding_phone) {
                setShowBindPhoneNumber(true)
              }
            }}
          >
            <div className={style['left']}>
              <img
                src={onFilterLeftImages(is_binding_phone)}
                alt="icon"
                className={style['ic-left']}
              />
              <span>Phone number</span>
            </div>
            <div className={style['right']}>
              {is_binding_phone ? 'Done' : 'Not set'}
            </div>
          </li>
          {page === 'withdraw' && (
            <li
              className={
                _.get(withdrawalAccounts, 'length') > 0
                  ? style['isBinding']
                  : ''
              }
              onClick={() => {
                if (!(_.get(withdrawalAccounts, 'length') > 0)) {
                  if (!is_binding_phone) {
                    dispatch(
                      ACTIONS.BASE.openAlert({
                        content: 'Please bind phone number first.',
                        cb: () => setShowBindPhoneNumber(true),
                      }),
                    )
                    return
                  }
                  if (kyc_status !== 1) {
                    dispatch(
                      ACTIONS.BASE.openAlert({
                        content: 'You need to pass the KYC verification first.',
                        cb: () => navigate('/kyc'),
                      }),
                    )
                    return
                  }
                  handleBindAccount()
                }
              }}
            >
              <div className={style['left']}>
                <img
                  src={onFilterLeftImages(
                    _.get(withdrawalAccounts, 'length') > 0,
                  )}
                  alt="icon"
                  className={style['ic-left']}
                />
                <span>Withdrawal account</span>
              </div>
              <div className={style['right']}>
                {_.get(withdrawalAccounts, 'length') > 0 ? 'Done' : 'Not set'}
              </div>
            </li>
          )}

          <li
            className={kyc_status === 1 ? style['isBinding'] : ''}
            onClick={() => {
              if (kyc_status !== 1) {
                if (!is_binding_phone) {
                  setShowBindPhoneNumber(true)
                  return
                }
                navigate('/kyc')
              }
            }}
          >
            <div className={style['left']}>
              <img
                src={onFilterLeftImages(kyc_status === 1)}
                alt="icon"
                className={style['ic-left']}
              />
              <span>KYC</span>
            </div>
            <div
              className={style['right']}
              style={{ color: onFilterStatus().color }}
            >
              {onFilterStatus().status}
            </div>
          </li>
        </ul>
      </div>
      <BindPhoneNumber
        visible={showBindPhoneNumber}
        setVisible={setShowBindPhoneNumber}
      />
      <VerityCode
        visible={verityCodeModal}
        setVisible={setVerityCodeModal}
        verifyType={ESendPhoneCodeFlag.updateVerify}
        onSucess={(token) => navigate('/account', { state: { token } })}
      />
    </>
  )
}
