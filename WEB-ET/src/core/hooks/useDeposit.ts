/*
 * @Date: 2024-09-14 15:12:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useDeposit.ts
 * @Description:
 */
import { useState } from 'react'
import useGlobal from './useGlobal'
import { useNavigate } from 'react-router-dom'
import useEventEmitter from './useEventEmitter'
export default () => {
  const navigate = useNavigate()
  const [paymentmethods, setPaymentMethods] = useState<any>()
  const [firstnumberlist, setNumberlist] = useState([])
  const [firstloadmin, setloadmin] = useState<string>('')
  const [firstloadmax, setloadmax] = useState<string>('')
  const [bid, setbid] = useState<string>('')
  const { emit: emitDespositSuccess } = useEventEmitter('openDesposit')
  const { dispatch, ACTIONS } = useGlobal()

  const getPayments = (loading = false, cacheClear = false) => {
    dispatch(
      ACTIONS.USER.getAllPaymentChannel({
        loading,
        cacheClear,
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(ACTIONS.BASE.openAlert({ content: res.msg }))
            return
          }
          setPaymentMethods(res.data?.chongzhiList || [])
          setNumberlist(
            res.data?.chongzhiList[0]?.payChannelList[0]?.recommendMoney || [],
          )
          setloadmin(
            res.data?.chongzhiList[0]?.payChannelList[0]?.loadmin || '',
          )
          setloadmax(
            res.data?.chongzhiList[0]?.payChannelList[0]?.loadmax || '',
          )
          setbid(res.data?.chongzhiList[0]?.payChannelList[0]?.bids || '')
        },
      }),
    )
  }

  const submitDepositOrder = ({ bid, amount, phstore }) => {
    dispatch(
      ACTIONS.USER.submitOdinDepositOrder({
        bid,
        amount,
        phstore,
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(ACTIONS.BASE.openAlert({ content: res.msg }))
            return
          }
          if (res.data.bankname !== 'GamingVenue') {
            if (res.data && !res.data.redirecturl) {
              dispatch(
                ACTIONS.BASE.openAlert({ content: $t('渠道暂时维护中') }),
              )
            }
            window.open(res.data.redirecturl)
            navigate('/wallet')
          }
          emitDespositSuccess()
        },
      }),
    )
  }

  return {
    getPayments,
    paymentmethods,
    submitDepositOrder,
    firstnumberlist,
    firstloadmin,
    firstloadmax,
    bid,
  }
}
