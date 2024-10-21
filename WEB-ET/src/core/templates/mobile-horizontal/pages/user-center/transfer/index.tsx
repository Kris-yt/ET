/*
 * @Date: 2024-07-31 00:23:47
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/transfer/index.tsx
 * @Description:
 */
import { useState } from 'react'
import Button from '@shadow/components/button'
import Panel from '@shadow/components/panel'
import AccountRecord from './account-change'
import DepositRecord from './deposit-record'
import WithdrawalRecord from './withdrawal-record'
import BetRecord from './bet-record'

import style from './style.module.scss'

export default () => {
  enum RecordType {
    Account = 'Balance Record',
    Deposit = 'Deposit Record',
    Withdrawal = 'Withdraw Record',
    Bet = 'Bet History',
  }
  const [showRecord, setShowRecord] = useState<RecordType | null>()

  const titleCompoentMapping = {
    [RecordType.Account]: <AccountRecord />,
    [RecordType.Deposit]: <DepositRecord />,
    [RecordType.Withdrawal]: <WithdrawalRecord />,
    [RecordType.Bet]: <BetRecord />,
  }

  return (
    <>
      <div className={style['trans-container']}>
        <ul className="trans-item-container">
          <li className="trans-item">
            <Button size="md" onClick={() => setShowRecord(RecordType.Account)}>
              {$t('帐变记录')}
            </Button>
          </li>
          <li className="trans-item">
            <Button size="md" onClick={() => setShowRecord(RecordType.Deposit)}>
              {$t('存款记录')}
            </Button>
          </li>
          <li className="trans-item">
            <Button
              size="md"
              onClick={() => setShowRecord(RecordType.Withdrawal)}
            >
              {$t('取款记录')}
            </Button>
          </li>
          <li className="trans-item">
            <Button size="md" onClick={() => setShowRecord(RecordType.Bet)}>
              {$t('投注记录')}
            </Button>
          </li>
        </ul>
      </div>
      {showRecord && (
        <Panel
          type="modal"
          title={showRecord}
          mode="board"
          onClose={() => setShowRecord(null)}
          display
        >
          <div className={style['rec-container']}>
            {titleCompoentMapping[showRecord]}
          </div>
        </Panel>
      )}
    </>
  )
}
