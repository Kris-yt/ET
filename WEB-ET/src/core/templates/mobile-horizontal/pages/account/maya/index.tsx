/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/account/maya/index.tsx
 * @Description:
 */
import { useState } from 'react'
import Background from '@base-ui/components/background'
import BindAccount from '@shadow/pages/account/bind-account'
import { EBindAccountType } from '@hooks/user-account/useBindWithdrawAccount'
import useGlobal from '@/core/hooks/useGlobal'
import style from './style.module.scss'

export default () => {
  const [showBindPanel, setShowBindPanel] = useState(false)
  const { useSelector } = useGlobal()
  const info = useSelector((state) => state.user.info)
  const MayaPayAccounts =
    info?.withdrawalAccounts.filter(
      (account) => account.accountType === EBindAccountType.MayaPay,
    ) || []

  const maxAcountNumber = info?.withdrawalAccountsMaxBound?.maya || 0

  if (showBindPanel) {
    return (
      <div className={style['account']}>
        <BindAccount
          onClose={() => setShowBindPanel(false)}
          accountType={EBindAccountType.MayaPay}
        />
      </div>
    )
  }

  return (
    <div className={style['account']}>
      <div className={style['list']}>
        <div className={style['content']}>
          {MayaPayAccounts?.map((account) => (
            <Background
              key={account.id}
              className={style['item-bg']}
              tag={'div'}
              src={require('./i/bg.png?format=webp')}
            >
              <div className={style['item-title']}>
                <Background
                  className={style['bank-icon']}
                  tag={'div'}
                  src={require('./i/bank.png?format=webp')}
                ></Background>
                Maya
              </div>
              <div className={style['number']}>
                {account.maskedAccountNumber}
              </div>
            </Background>
          ))}
          {MayaPayAccounts?.length < maxAcountNumber && (
            <Background
              className={style['add-bg']}
              tag={'div'}
              src={require('./i/bg-empty.png?format=webp')}
            >
              <button
                onClick={() => setShowBindPanel(true)}
                className={style['button']}
              >
                <Background
                  className={style['add-icon']}
                  tag={'div'}
                  src={require('./i/add.png?format=webp')}
                ></Background>
              </button>
              <div className={style['add-title']}>Add Maya</div>
            </Background>
          )}
        </div>
        <div className={style['tips']}>
          {$t(`温馨提示：每个账户最多可以绑定#number#个Maya`, {
            number: maxAcountNumber,
          })}
        </div>
      </div>
    </div>
  )
}
