/*
 * @Date: 2024-09-14 15:12:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useWithdraw.ts
 * @Description:
 */

import _ from 'lodash'
import useGlobal from './useGlobal'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default () => {
  const navigate = useNavigate()
  const { dispatch, ACTIONS } = useGlobal()
  const [withdrawMethods, setWithdrawMethods] = useState<any>()
  const [unfinishedActivityDetail, setUnfinishedActivityDetail] = useState<any>(
    {},
  )

  const [withdrawQuota, setWithdrawQuota] = useState<any>({})
  const [withdrawDetail, setWithdrawDetail] = useState<any>({})
  const [methodValue1, setMethodValue1] = useState<string | number>()
  const [methodValue2, setMethodValue2] = useState<string | number>()
  const [amount, setAmount] = useState<any>('')

  useEffect(() => {
    getUnfinishedActivityDetail()
  }, [])

  useEffect(() => {
    if (methodValue1) {
      const channel = _.find(withdrawMethods, { value: methodValue1 })
      changeWithdrawTab(channel)
    }
  }, [methodValue1])

  // 获取未完成活动流水详情
  const getUnfinishedActivityDetail = () => {
    dispatch(
      ACTIONS.USER.getUnfinishedActivityDetail({
        cb: (res: any) => {
          setUnfinishedActivityDetail(res.data)
          getWithdrawments()
          // 获取可提额度
          dispatch(
            ACTIONS.USER.getWithdrawQuota({
              cb: (res: any) => setWithdrawQuota(res.data),
            }),
          )
        },
        loading: false,
      }),
    )
  }

  //获取所有提现渠道
  const getWithdrawments = (loading = false) => {
    dispatch(
      ACTIONS.USER.getWithdrawInfo({
        loading,
        check: (window as any).SEC_CODE,
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(ACTIONS.BASE.openAlert({ content: res.msg }))
            return
          }
          const data = _.chain(res.data)
            .filter((item: any) => item.enable)
            .map((item: any) =>
              _.assign({}, item, { value: item.type, label: item.title }),
            )
            .unionBy('value')
            .value()
          setWithdrawMethods(data || [])
        },
      }),
    )
  }

  // 切换取款渠道(STEP1获取提现渠道详情)
  const changeWithdrawTab = (channel: any) => {
    dispatch(
      ACTIONS.USER.withdrawStep1({
        type: channel.name,
        loading: true,
        cb: (res: any) => {
          if (res.message !== 'success' || res.status !== 10000) {
            return dispatch(ACTIONS.BASE.openToast({ text: res.message }))
          }
          const data = res.data
          data.user_bank_info =
            _.chain(res.data.user_bank_info)
              .map((item: any) =>
                _.assign({}, item, { value: item.id, label: item.account }),
              )
              .value() || []
          setWithdrawDetail(data)
        },
      }),
    )
  }

  const setInputAmount = (value: string) => {
    if (
      !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(
        value,
      )
    ) {
      setAmount('')
      return
    }
    if (+value > +withdrawDetail?.max_money) {
      setAmount(withdrawDetail?.max_money)
      return
    }
    setAmount(value)
  }

  const submitWithdraw = () => {
    if (!amount || +amount < +withdrawDetail?.min_money) {
      return dispatch(
        ACTIONS.BASE.openToast({
          type: 'info',
          text: `${$t('单笔提现范围为')}：${withdrawDetail?.min_money}-${withdrawDetail?.max_money}`,
        }),
      )
    }

    const channel = _.find(withdrawMethods, { value: methodValue1 })

    const data = {
      money: amount,
      wtype: channel.name,
    }

    if (channel.name !== 'phstore') {
      ;(data as any).bank_id = methodValue2
    }

    dispatch(
      ACTIONS.USER.goWithdraw({
        data,
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(ACTIONS.BASE.openAlert({ content: res.message }))
            return
          }
          if (res.status === 10000) {
            dispatch(
              ACTIONS.BASE.openAlert({
                content:
                  'Withdraw successful, please wait for personnel check.',
              }),
            )
            navigate('/wallet')
            return
          }
        },
      }),
    )
  }

  return {
    submitWithdraw,
    withdrawMethods,
    unfinishedActivityDetail,
    withdrawQuota,
    withdrawDetail,
    methodValue1,
    setMethodValue1,
    methodValue2,
    setMethodValue2,
    amount,
    setInputAmount,
  }
}
