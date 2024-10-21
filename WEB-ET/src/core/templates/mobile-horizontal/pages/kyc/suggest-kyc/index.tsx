/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/failed-review/index.tsx
 * @Description:
 */
import Button from '@shadow/components/button'
import style from './style.module.scss'
import { useState } from 'react'
import MiniPanel from '../../../components/mini-panel'
import useEventEmitter from '@hooks/useEventEmitter'
import useGlobal from '@/core/hooks/useGlobal'
import dayjs from 'dayjs'
export default () => {
  const { useSelector } = useGlobal()
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)
  const userInfo = useSelector((state) => state.user.info)
  // const [resultDate, setResultDate] = useState(''); // 结果日期
  const inputDate = dayjs(userInfo?.registertime)
  const newDate = inputDate.add(3, 'day')
  const formattedDate = newDate.format('YYYY-MM-DD HH:mm:ss')
  // setResultDate(newDate);
  console.log('7777', formattedDate)
  console.log('8888', userInfo?.registertime)
  useEventEmitter('openSuggest', () => {
    setDisplayModal(true)
  })

  useEventEmitter('closeSuggest', () => {
    setDisplayModal(false)
  })
  const handleclick = () => {
    setDisplayModal(false)
    window.location.href = '/webapp/#/user/security'
  }
  return (
    <>
      <MiniPanel
        title={'kyc'}
        size="m"
        display={!!displayModal}
        onClose={() => setDisplayModal(false)}
      >
        <div className={style['item-container']}>
          <div className={style['item-content']}>
            Due to the Regulatory Framework, we recommend you to submit KYC
            before <span>{formattedDate}</span>.
          </div>
          <Button onClick={() => handleclick()}>GO</Button>
        </div>
      </MiniPanel>
    </>
  )
}
