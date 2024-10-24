/*
 * @Date: 2024-07-31 00:23:47
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/bonus-center/index.tsx
 * @Description:
 */
import { useState } from 'react'
import usePullUpLoadmore from '../usePullUpLoadmore'
import useActivityReward from '@/core/hooks/dashboard/useActivityReward'
import SelectMini from '@shadow/components/select/mini'
import NoData from '@shadow/components/no-data'
import {
  bonusTimeMapping,
  displayCurrency,
  displayDateTime,
  displayValue,
} from '@utlis/formatData'
import { bonusActivityOptions, bonusTimeOptions } from '../transfer/const'
import style from './style.module.scss'

export default () => {
  const { doQuery, querys, recordsCount, data, meta, loadMore, putReward } =
    useActivityReward({})

  const [typeValue, setTypeValue] = useState('0')
  const [statusValue, setStatusValue] = useState('0')

  const { scrollableRef, containerRef, updateDoQuery } =
    usePullUpLoadmore<HTMLTableSectionElement>({
      data,
      amountOfDataSize: recordsCount,
      querySize: querys.pageSize,
      doQuery,
      querys,
      onLoadMore: loadMore,
    })

  return (
    <div className={style['bonus-container']}>
      <div className="bonus-head">
        <div className="bonus-head_item bonus-title">
          <SelectMini
            options={bonusActivityOptions}
            value={typeValue}
            onSelected={(value) => {
              setTypeValue(String(value))
              updateDoQuery({ filter_rewards: value !== '0' ? value : '' })
            }}
          />
        </div>
        <div className="bonus-head_item bonus-time">
          <SelectMini
            options={bonusTimeOptions}
            value={statusValue}
            onSelected={(value) => {
              setStatusValue(String(value))
              updateDoQuery(bonusTimeMapping[value])
            }}
          />
        </div>
        <div className="bonus-head_item bonus-amount">
          <div>{$t('待领取')}:</div>
          <span className="money-slot">
            {displayCurrency(meta.total_pending_amount)}
          </span>
        </div>
      </div>
      <div className="bonus-body">
        <div ref={scrollableRef} className="bonus-content">
          <table className="bonus-list">
            <thead className="table-head">
              <tr>
                <th className="cell-reward">{$t('栏目奖金名')}</th>
                <th>{$t('栏目总额')}</th>
                <th>{$t('栏目提款倍数')}</th>
                <th>{$t('栏目有效期')}</th>
                <th>{$t('栏目操作')}</th>
              </tr>
            </thead>
            <tbody ref={containerRef}>
              {data?.length ? (
                data.map((item, idx) => (
                  <tr key={`${item.activity_id}_${idx}`} className="table-item">
                    <td className="cell-reward">
                      <div className="text">
                        {displayValue(item.reward_title)}
                      </div>
                    </td>
                    <td className="cell-money">
                      <div className="text">{displayCurrency(item.money)}</div>
                    </td>
                    <td className="times-signed">
                      {item.wagering_requirement}
                    </td>
                    <td>{displayDateTime(item.expired_at)}</td>
                    <td
                      onClick={() => putReward(item, querys)}
                      className={`${item.operation === '领取' ? 'state_1' : ''}`}
                    >
                      <span className="item-text">{$t(item.operation)}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <NoData tag="td" className="no-data-lyr" />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
