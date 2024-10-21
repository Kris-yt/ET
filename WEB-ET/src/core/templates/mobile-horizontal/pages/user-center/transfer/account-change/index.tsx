import { useState } from 'react'
import useAccountChange from '@/core/hooks/dashboard/useAccountChange'
import usePullUpLoadmore from '../../usePullUpLoadmore'
import SelectMini from '@shadow/components/select/mini'
import NoData from '@shadow/components/no-data'
import {
  transTimeMapping,
  displayCurrency,
  displayDateTime,
} from '@utlis/formatData'
import { orderStatus, transTimeOptions } from '../const'
import style from '../style.module.scss'

export default () => {
  type optionUnionType = number | string
  const keepOrderOption = [
    '类型',
    '充值',
    '提款',
    '游戏转入转出',
    '活动',
    '其他',
  ]
  const { doQuery, querys, orderTypes, recordsCount, data, loadMore } =
    useAccountChange({})
  const [orderType, setOrderType] = useState<optionUnionType>('0')
  const [status, setStatus] = useState<optionUnionType>('0')
  const [timeRange, setTimeRange] = useState<optionUnionType>('0')

  const { containerRef, updateDoQuery } =
    usePullUpLoadmore<HTMLTableSectionElement>({
      data,
      amountOfDataSize: recordsCount,
      querySize: querys.pageSize,
      doQuery,
      querys,
      onLoadMore: loadMore,
    })

  const orderToOptions = orderTypes
    .filter((item) => keepOrderOption.includes(item.cntitle))
    .map((t) => ({
      value: String(t.id),
      label: statusDecode[t.cntitle] as string,
    }))

  return (
    <>
      <div className="rec-head">
        <div className="rec-head_item">
          <SelectMini
            options={orderToOptions}
            value={orderType}
            onSelected={(value) => {
              setOrderType(value)
              updateDoQuery({ ordertype: value })
            }}
          />
        </div>
        <div className="rec-head_item">
          <SelectMini
            options={orderStatus}
            value={status}
            onSelected={(value) => {
              setStatus(value)
              updateDoQuery({ status: value })
            }}
          />
        </div>
        <div className="rec-head_item">
          <SelectMini
            options={transTimeOptions}
            value={timeRange}
            onSelected={(value) => {
              setTimeRange(value)
              updateDoQuery(transTimeMapping[value])
            }}
          />
        </div>
      </div>
      <div className="rec-body">
        <div className="rec-content">
          <table className="rec-list">
            <thead className="table-head">
              <tr>
                <th>{$t('栏目提交时间')}</th>
                <th>{$t('栏目交易码')}</th>
                <th>{$t('栏目总额')}</th>
                <th>{$t('栏目类型')}</th>
                <th>{$t('栏目状态')}</th>
              </tr>
            </thead>
            <tbody ref={containerRef} className={style['rec-status-wrap']}>
              {data?.length ? (
                data.map((item, idx) => (
                  <tr key={`${item.uniquekey}_${idx}`} className="table-item">
                    <td className="item-time">{displayDateTime(item.times)}</td>
                    <td>{item.orderno}</td>
                    <td
                      style={{
                        color:
                          item.operations == '1'
                            ? 'var(--rec-positive-status)'
                            : 'var(--rec-negative-status)',
                      }}
                    >
                      {item.operations == '1'
                        ? `+${displayCurrency(item.amount)}`
                        : `-${displayCurrency(item.amount)}`}
                    </td>
                    <td>{item.cntitle}</td>
                    <td className={`_st_${item.transferstatus}`}>
                      {['1', '3'].includes(item.transferstatus)
                        ? $t('失败')
                        : $t('成功')}
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
    </>
  )
}

const statusDecode = {
  类型: $t('类型'),
  充值: $t('充值'),
  提款: $t('提款'),
  游戏转入转出: $t('游戏转入转出'),
  活动: $t('活动'),
  其他: $t('其他'),
  /*
  '返水': $t('返水'),
  '返点': $t('返点')
  */
}
