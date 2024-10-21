import { useState } from 'react'
import { useMount } from 'react-use'
import useBetRecord from '@/core/hooks/dashboard/useBetRecord'
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
import { betOptions, transTimeOptions } from '../const'
import style from '../style.module.scss'

export default () => {
  type optionUnionType = number | string

  const { doQuery, querys, platforms, data, loadMore, recordsCount } =
    useBetRecord({})
  const [platformType, setPlatformType] = useState<optionUnionType>(
    $t('所有平台'),
  )
  const [showDetail, setShowDetail] = useState<any>()
  // const [showLotterydetail, setShowLotterydetail] = useState<any>();
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

  const platformToOptions = platforms.map((t) => ({
    value: t.code as string,
    label: t.code as string,
  }))

  return (
    <>
      <div className="rec-head">
        <div className="rec-head_item">
          <SelectMini
            options={platformToOptions}
            value={platformType}
            onSelected={(value) => {
              setPlatformType(value)
              updateDoQuery({ platform: value !== $t('所有平台') ? value : '' })
            }}
          />
        </div>
        <div className="rec-head_item">
          <SelectMini
            options={betOptions}
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
                <th>{$t('栏目投注时间')}</th>
                <th>{$t('栏目平台名')}</th>
                <th>{$t('栏目总额')}</th>
                <th>{$t('栏目盈亏额')}</th>
                <th>{$t('栏目状态')}</th>
              </tr>
            </thead>
            <tbody ref={containerRef} className={style['rec-status-wrap']}>
              {data?.length ? (
                data.map((item, idx) => (
                  <tr key={`${item.project_id}_${idx}`} className="table-item">
                    <td className="item-time">
                      {displayDateTime(item.project_Game_date)}
                    </td>
                    <td>{item.p}</td>
                    <td>{displayCurrency(item.project_bet)}</td>
                    <td
                      className={`${item.sum != 0 ? `_st_${item.project_BetResult}` : ''} ${item.sum > 0 ? 'signed' : ''}`}
                    >
                      {displayCurrency(item.sum)}
                    </td>
                    <td
                      className={`data-status _st_${item.project_BetResult} more`}
                      onClick={() =>
                        setShowDetail({
                          id: item.project_Game_code,
                          platform: item.p,
                        })
                      }
                    >
                      {statusDecode[item.project_BetResult] ?? $t('未结算')}
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
        <ThirdBetDetail
          id={showDetail.id}
          platform={showDetail.platform}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}
interface IThirdBetDetail {
  id: string
  platform: string
  onClose: () => void
}
const ThirdBetDetail = ({ id, platform, onClose }: IThirdBetDetail) => {
  const { getThirdBetDetail, detail } = useBetRecord({
    shouldGetThirdPlatforms: false,
  })

  useMount(() => getThirdBetDetail({ id, platform }))

  return (
    <MediumPanel
      display={true}
      className={`${style['rec-status-wrap']} ${style['detail-wrapper']}`}
      title={$t('订单详情')}
      onClose={onClose}
    >
      <div className={style['anchor-point']}>
        <div>
          <div className="head-info">
            <ul className="detail-left">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目供应交易码')}</span>
                <span className="detail-value">
                  {detail?.project_Game_code ? (
                    <>
                      <span className="game-code">
                        {displayValue(detail?.project_Game_code)}
                      </span>
                      <Copy text={detail?.project_Game_code}>
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
                <span className="detail-key">{$t('栏目投注时间')}</span>
                <span className="detail-value item-time">
                  {displayDateTime(detail?.project_Game_date)}
                </span>
              </li>
            </ul>
            <ul className="detail-right">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目平台名')}</span>
                <span className="detail-value">
                  {displayValue(detail?.venue)}
                </span>
              </li>
              <li className="detail-item">
                <span className="detail-key">{$t('栏目更新时间')}</span>
                <span className="detail-value item-time">
                  {displayDateTime(detail?.project_WinLostDateTime)}
                </span>
              </li>
            </ul>
          </div>
          <div className="body-info">
            <ul className="detail-left">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目游戏类别')}</span>
                <span className="detail-value">
                  {displayValue(detail?.pogcor_type)}
                </span>
              </li>
            </ul>
            <ul className="detail-right">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目游戏名')}</span>
                <span className="detail-value">
                  {displayValue(detail?.project_Game_name)}
                </span>
              </li>
            </ul>
          </div>
          <div className="footer-info">
            <ul className="detail-left">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目投注总额')}</span>
                <span className="detail-value">
                  {displayCurrency(detail?.project_bet)}
                </span>
              </li>
              <li className="detail-item">
                <span className="detail-key">{$t('栏目备注')}</span>
                <span className="detail-value">---</span>
              </li>
            </ul>
            <ul className="detail-right">
              <li className="detail-item">
                <span className="detail-key">{$t('栏目盈亏额')}</span>
                <span
                  className={`detail-value ${detail?.sum != 0 ? `_st_${detail?.project_BetResult}` : ''} ${detail?.sum > 0 ? 'signed' : ''}`}
                >
                  {displayCurrency(detail?.sum)}
                </span>
              </li>
              <li className="detail-item">
                <span className="detail-key">{$t('栏目状态')}</span>
                <span
                  className={`detail-value _st_${detail?.project_BetResult}`}
                >
                  {statusDecode[detail?.project_BetResult] ?? $t('未结算')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MediumPanel>
  )
}

const statusDecode = {
  V: $t('未结算'),
  CO: $t('提前结算'),
  C: $t('撤单'),
  L: $t('输'),
  W: $t('赢'),
  T: $t('平'),
  J: $t('拒单'),
  CANCLE_ORD: $t('取消'),
  HALFLOSE: $t('输一半'),
  HALFWIN: $t('赢一半'),
  VOID: $t('无效'),
}
