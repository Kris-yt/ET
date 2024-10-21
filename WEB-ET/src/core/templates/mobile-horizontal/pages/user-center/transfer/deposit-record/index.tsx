import { useState } from 'react'
import useDepoistAndWithdrawalRecord from '@/core/hooks/dashboard/useDepoistAndWithdrawalRecord'
import usePullUpLoadmore from '../../usePullUpLoadmore'
import Background from '@base-ui/components/background'
import Copy from '@shadow/components/copy'
import SelectMini from '@shadow/components/select/mini'
import MediumPanel from '@shadow/components/medium-panel'
import NoData from '@shadow/components/no-data'
import {
  transTimeMapping,
  displayCurrency,
  displayDateTime,
  displayValue,
} from '@utlis/formatData'
import { depositOptions, transTimeOptions, updateRemarkColor } from '../const'
import style from '../style.module.scss'

export default () => {
  type optionUnionType = number | string

  const { doQuery, querys, data, recordsCount, loadMore } =
    useDepoistAndWithdrawalRecord({
      type: 'deposit',
    })
  const [showDetail, setShowDetail] = useState<any>()
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

  return (
    <>
      <div className="rec-head">
        <div className="rec-head_item">
          <SelectMini
            options={depositOptions}
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
                <th>{$t('栏目总额')}</th>
                <th>{$t('栏目方法')}</th>
                <th>{$t('栏目状态')}</th>
              </tr>
            </thead>
            <tbody ref={containerRef} className={style['rec-status-wrap']}>
              {data?.length ? (
                data.map((item, idx) => (
                  <tr key={`${item.id}_${idx}`} className="table-item">
                    <td className="item-time">
                      {displayDateTime(item.created)}
                    </td>
                    <td className="item-money">
                      {displayCurrency(item.money)}
                    </td>
                    <td>{item.payport_nickname}</td>
                    <td
                      className={`data-status _st_dep_${item.status} more`}
                      onClick={() =>
                        setShowDetail({
                          details: item.details,
                        })
                      }
                    >
                      {depositStatus[item.status] ?? '其他'}
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
      {showDetail && (
        <DetailPanel
          detail={showDetail.details}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}
interface IDetailPanel {
  detail: any
  onClose: () => void
}
const DetailPanel = ({ detail, onClose }: IDetailPanel) => {
  const highlightErrStatus = ['3'] // 3: 充值失败

  return (
    <MediumPanel
      display={true}
      className={`${style['rec-status-wrap']} ${style['detail-wrapper']}`}
      title={$t('订单详情')}
      onClose={onClose}
    >
      <div>
        <div className={`body-info ${style['anchor-point']}`}>
          <ul className="detail-left">
            <li className="detail-item">
              <span className="detail-key">{$t('栏目平台识别码')}</span>
              <span className="detail-value">
                {detail.platform_id ? (
                  <>
                    <span className="game-code">
                      {displayValue(detail.platform_id)}
                    </span>
                    <Copy text={detail.platform_id}>
                      <Background
                        className="copy-btn"
                        src={require('../i/copy.png')}
                      />
                    </Copy>
                  </>
                ) : null}
              </span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目提交时间')}</span>
              <span className="detail-value item-time">
                {displayDateTime(detail.submit_time)}
              </span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目入款时间')}</span>
              <span className="detail-value item-time">
                {displayDateTime(detail.arrival_time)}
              </span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目备注')}</span>
              <span
                className={`detail-value ${'_st_dep-d_' + updateRemarkColor(detail, highlightErrStatus)}`}
              >
                {displayValue(detail.remarks)}
              </span>
            </li>
          </ul>
          <ul className="detail-right">
            <li className="detail-item">
              <span className="detail-key">{$t('栏目类型')}</span>
              <span className="detail-value">{displayValue(detail.type)}</span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目总额')}</span>
              <span className="detail-value">
                {displayCurrency(detail.amount)}
              </span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目银行费用')}</span>
              <span className="detail-value">
                {displayCurrency(detail.bank_charge)}
              </span>
            </li>
            <li className="detail-item">
              <span className="detail-key">{$t('栏目状态')}</span>
              <span className={`detail-value _st_dep-d_${detail.status}`}>
                {depositStatus[detail.status]}
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <div className="detail-left">
            <div className="detail-item wide-space">
              <span className="detail-key">{$t('栏目实体站')}</span>
              <span className="detail-value">
                {displayValue(detail.gaming_venue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MediumPanel>
  )
}

const depositStatus = {
  '-1': $t('支付中'),
  '0': $t('待处理'),
  '1': $t('已审核'),
  '2': $t('充值成功'),
  '3': $t('充值失败'),
  '4': $t('超时无效'),
  '5': $t('已没收'),
  '6': $t('人工充值成功'),
  '7': $t('取消充值'),
}
