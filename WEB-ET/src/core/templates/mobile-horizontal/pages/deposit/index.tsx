/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/deposit/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import Background from '@base-ui/components/background'
import useEventEmitter from '@hooks/useEventEmitter'
import InputText from '@shadow/components/input-text'
import MiniPanel from '@shadow/components/mini-panel'
import Button from '@shadow/components/button'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import useDeposit from '@hooks/useDeposit'
import useGlobal from '@/core/hooks/useGlobal'
export default () => {
  const navigate = useNavigate()
  const { useSelector } = useGlobal()
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)
  const { emit: closeModal } = useEventEmitter('closeDeposit')
  const [method, setMethod] = useState<string>('gacsh')
  const [amount, setAmount] = useState<any>('')
  const [tips, setTips] = useState<string>('')
  const [bids, setBids] = useState<string>('')
  const {
    getPayments,
    paymentmethods,
    firstnumberlist,
    firstloadmin,
    firstloadmax,
    bid,
    submitDepositOrder,
  } = useDeposit()
  const [showDespositPanel, setDespositPanel] = useState<boolean>(false)
  const [paymentMethods, setPatmentmethod] = useState([])
  const [numberlist, setNumberlist] = useState([])
  const [loadmin, setloadmin] = useState<string>('')
  const [loadmax, setloadmax] = useState<string>('')
  const userInfo = useSelector<any>((state) => state.user?.info)
  useEventEmitter('closeDeposit', () => {
    navigate('/wallet')
  })
  useEventEmitter('openDesposit', () => {
    setDespositPanel(true)
  })
  useEffect(() => {
    if (method === 'gacsh') {
      setPatmentmethod(
        paymentmethods || Store.localStorage.get('paymentlist') || [],
      )
      setNumberlist(
        firstnumberlist || Store.localStorage.get('numberlist') || [],
      )
      setloadmin(firstloadmin || Store.localStorage.get('loadmin') || '')
      setloadmax(firstloadmax || Store.localStorage.get('loadmax') || '')
      setBids(bid || Store.localStorage.get('bid') || '')
    } else {
      getPayments()
    }
  }, [paymentMethods, numberlist, loadmin, loadmax])

  const handleDepositClose = () => {
    setDespositPanel(false)
  }
  const handleGameClose = () => {
    setDespositPanel(false)
    navigate('/wallet')
  }
  useEffect(() => {
    if (displayModal === false) {
      closeModal()
    }
  }, [displayModal])

  useEffect(() => {
    getPayments()
  }, [])

  const setInputAmount = (value: any) => {
    if (!/^(|[1-9]\d*|0)(\.\d{1,2})?$/.test(value)) {
      setTips($t('请输入正确金额'))
      return
    }
    setAmount(value)
  }

  const confirmButton = () => {
    if (!method) {
      return
    }
    if (method === 'gacsh' || method === 'maya') {
      submitDepositOrder({ bid: bids, amount: Number(amount), phstore: '' })
    } else {
      submitDepositOrder({
        bid: bids,
        amount: Number(amount),
        phstore: Number(userInfo?.phstore),
      })
    }
  }
  const handleMethod = (title: string, payList: any) => {
    console.log('6666', payList)
    setMethod(title)
    setBids(payList?.bid)
    setNumberlist(payList?.recommendMoney)
    setloadmin(payList?.loadmin)
    setloadmax(payList?.loadmax)
  }

  return (
    <>
      <MiniPanel
        title="Deposit"
        size="b"
        display={!displayModal}
        onClose={() => setDisplayModal(false)}
      >
        <div className={style['deposit-container']}>
          {paymentMethods.length === 0 && (
            <div className={style['nodata']}>
              <div className={style['nodata-img']}></div>
              <span className={style['nodata-title']}>
                There is currently no deposit channel available, please contact
                customer service...
              </span>
            </div>
          )}
          {paymentMethods.length !== 0 && (
            <div className={style['listBox']}>
              <h3 className={style['title']}>Deposit method</h3>
              <ul className={style['list']}>
                {paymentMethods &&
                  paymentMethods.map((i: any) => (
                    <li
                      className={`${style[i.dispay_title]} ${
                        method === i.dispay_title
                          ? style[i.dispay_title + 'Active']
                          : ''
                      }`}
                      key={i.id}
                      onClick={() =>
                        handleMethod(i.dispay_title, i?.payChannelList[0])
                      }
                    />
                  ))}
              </ul>
            </div>
          )}
          {paymentMethods.length !== 0 && (
            <div className={style['listBox']}>
              <h3 className={style['title']}>Deposit amount</h3>
              <ul className={style['list']}>
                {numberlist.map((i: string) => (
                  <Background
                    className={style['amountItem']}
                    tag="li"
                    key={i}
                    src={
                      amount === i
                        ? require('./i/amount-s.png?format=webp')
                        : require('./i/amount.png?format=webp')
                    }
                    onClick={() => setAmount(i)}
                  >
                    {Number(i).toLocaleString()}
                  </Background>
                ))}
              </ul>
              <InputText
                placeholder={`P${loadmin}-P${loadmax}`}
                shape="sharp"
                value={amount}
                maxLength={30}
                tips={tips}
                onChange={(value) => setInputAmount(value)}
              />
            </div>
          )}

          {paymentMethods.length !== 0 && (
            <div className={style['confirm']}>
              <Button onClick={() => confirmButton()}> {$t('确定')}</Button>
            </div>
          )}
        </div>
      </MiniPanel>
      <MiniPanel
        title={'Deposit'}
        display={showDespositPanel}
        onClose={handleDepositClose}
      >
        <div className={style['modal-container']}>
          <div className={style['modal-title']}>
            We have got your deposit request, kindly pay at the gaming venue
            within 24 hours. Or your deposit request could be automatically
            invalid.
          </div>
          <Button className={style['button']} onClick={handleGameClose}>
            {$t('确定')}
          </Button>
        </div>
      </MiniPanel>
    </>
  )
}
