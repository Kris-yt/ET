/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/withdraw/index.tsx
 * @Description:
 */

import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '@shadow/components/panel/index'
import Select from '@shadow/components/select'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import style from './style.module.scss'
import useGlobal from '@/core/hooks/useGlobal'
import useBalance from '@/core/hooks/useBalance'
import useWithdraw from '@/core/hooks/useWithdraw'
import InfoBinding from './info-bind/index'

export default () => {
  const [infoBinding, setInfoBinding] = useState<boolean>(true)
  const navigate = useNavigate()
  const { useSelector } = useGlobal()
  const { is_binding_phone, withdrawalAccounts, kyc_status } = useSelector<any>(
    (state) => state.user?.info,
  )

  useEffect(() => {
    if (
      is_binding_phone &&
      _.get(withdrawalAccounts, 'length') > 0 &&
      kyc_status === 1
    ) {
      setInfoBinding(false)
    }
  }, [])

  return (
    <Panel
      type="modal"
      mode="board"
      title="withdraw"
      onClose={() => navigate('/wallet')}
      display
    >
      {infoBinding ? <InfoBinding page="withdraw" /> : <Withdraw />}
    </Panel>
  )
}

const Withdraw = () => {
  const { useSelector } = useGlobal()
  const userInfo = useSelector<any>((state) => state.user.info)
  const { toDecimal } = useBalance()
  const {
    submitWithdraw,
    withdrawQuota,
    unfinishedActivityDetail,
    withdrawMethods,
    withdrawDetail,
    methodValue1,
    setMethodValue1,
    methodValue2,
    setMethodValue2,
    amount,
    setInputAmount,
  } = useWithdraw()

  const isphstore =
    _.find(withdrawMethods, { name: 'phstore' })?.type == methodValue1

  return (
    <div className={style['withdraw-container']}>
      <div className={style['info']}>
        <div className={`${style['infoBoxFormat']} ${style['turnoverBox']}`}>
          <div className={style['itemFormat']}>
            <span>{$t('未完成流水')}:</span>
            <span>
              {toDecimal(
                unfinishedActivityDetail?.withdraw_dispensing_money || 0,
              )}
            </span>
          </div>
          <div className={style['itemFormat']}>
            <span>{$t('账户余额')}:</span>
            <span>{toDecimal(userInfo.availablebalance)}</span>
          </div>
        </div>
        <div className={`${style['infoBoxFormat']} ${style['avaiBox']}`}>
          <div className={`${style['itemFormat']} ${style['avaiItem']}`}>
            <span>{$t('可提款金额')}:</span>
            <span>{toDecimal(withdrawQuota.fAvailableBalance || 0)}</span>
          </div>
        </div>
      </div>
      {unfinishedActivityDetail?.withdraw_dispensing_money == 0 &&
        withdrawQuota.fAvailableBalance > 0 && (
          <>
            <div className={style['method']}>
              <h3 className={style['title']}>Withdraw method</h3>
              <div className={style['selects']}>
                {_.get(withdrawMethods, 'length') > 0 ? (
                  <>
                    <Select
                      specialStyle="withdraw-input-container"
                      options={withdrawMethods}
                      value={methodValue1}
                      onSelected={(value) => setMethodValue1(value)}
                      placeholder="Please select"
                    />
                    {!isphstore && (
                      <Select
                        specialStyle="withdraw-input-container"
                        options={withdrawDetail.user_bank_info}
                        value={methodValue2}
                        onSelected={(value) => setMethodValue2(value)}
                        placeholder="Please select"
                      />
                    )}
                  </>
                ) : (
                  <p className={style['method-tips']}>
                    {$t('暂无可用提款渠道，请联系客服')}!
                  </p>
                )}
              </div>
              <div className={style['amount']}>
                <h3 className={style['title']}>Withdraw amount</h3>
                <InputText
                  placeholder={`P${withdrawDetail?.min_money || 0}-${withdrawDetail?.max_money || 0}`}
                  shape="sharp"
                  value={amount}
                  onChange={(value) => setInputAmount(value)}
                  tips={!amount && $t('请输入正确金额')}
                  disabled={
                    isphstore ? !methodValue1 : !methodValue1 || !methodValue2
                  }
                />
              </div>
            </div>
            <div className={style['confirm']}>
              <Button
                onClick={() => submitWithdraw()}
                disabled={
                  isphstore
                    ? !amount || !methodValue1
                    : !amount || !methodValue1 || !methodValue2
                }
              >
                {$t('确认')}
              </Button>
            </div>
          </>
        )}
    </div>
  )
}
