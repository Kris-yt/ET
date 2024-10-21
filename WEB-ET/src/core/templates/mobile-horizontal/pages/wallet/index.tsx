/*wallet
 * @Date: 2024-08-2 10:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/wallet/index.tsx
 * @Description:
 */
import { useState } from 'react'
import Panel from '@shadow/components/panel/index'
import Background from '@base-ui/components/background'
import style from './style.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import useGlobal from '@/core/hooks/useGlobal'
import useBalance from '@/core/hooks/useBalance'
import VerityCode from '@shadow/components/business-modals/verity-code/index'
import { ESendPhoneCodeFlag } from '@/core/hooks/useSendPhoneCode'
import InfoBinding from '@shadow/pages/account/info-bind/index'

const pageRightNode = require('./i/right-bottom.png?format=webp')
export default () => {
  const navigate = useNavigate()
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const { availablebalance, is_binding_phone, kyc_status } = useSelector<any>(
    (state) => state.user.info,
  )
  const { toDecimal } = useBalance()
  const [loading, setLoading] = useState(false)
  const [verityCodeModal, setVerityCodeModal] = useState<boolean>(false)
  const [infoBinding, setInfoBinding] = useState<boolean>(false)

  const onRefresh = () => {
    setLoading(true)
    dispatch(
      ACTIONS.USER.getBalance({
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(
              ACTIONS.BASE.openToast({
                text: 'Balance update failed',
                type: 'error',
              }),
            )
            return
          }
          dispatch(
            ACTIONS.BASE.openToast({ text: 'Balance update', type: 'success' }),
          )
          setLoading(false)
        },
      }),
    )
  }

  const handleBindAccount = () => {
    if (!is_binding_phone || kyc_status !== 1) {
      setInfoBinding(true)
      return
    }
    setVerityCodeModal(true)
  }

  if (infoBinding) {
    return <InfoBinding onBack={() => setInfoBinding(false)} />
  }

  return (
    <>
      <Panel
        type="page"
        mode="empty"
        title="wallet"
        defalutBackPath={'/home'}
        isShowBack={true}
        display
        pageRightNode={<img width={123} height={236} src={pageRightNode} />}
      >
        <Background
          src={require('./i/wallet-bg.png?format=webp')}
          className={style['wallet-container']}
        >
          <div className={style['wallet-left']}>
            <span>
              ₱ {loading ? $t('刷新中') : toDecimal(availablebalance)}
            </span>
            <img
              src={require('./i/refresh.png?format=webp')}
              alt=""
              onClick={onRefresh}
            />
          </div>

          <ul className={style['wallet-right']}>
            <li onClick={() => navigate('/wallet/deposit')}>
              <img src={require('./i/deposit.png?format=webp')} alt="" />
            </li>
            <li
              onClick={() => navigate('/wallet/withdraw')}
              className={style['iMargin']}
            >
              <img src={require('./i/withdraw.png?format=webp')} alt="" />
            </li>
            <li onClick={handleBindAccount}>
              <img src={require('./i/account.png?format=webp')} alt="" />
            </li>
          </ul>

          <VerityCode
            visible={verityCodeModal}
            setVisible={setVerityCodeModal}
            verifyType={ESendPhoneCodeFlag.updateVerify}
            onSucess={(token) => navigate('/account', { state: { token } })}
          />
        </Background>
        <Outlet />
      </Panel>
    </>
  )
}
