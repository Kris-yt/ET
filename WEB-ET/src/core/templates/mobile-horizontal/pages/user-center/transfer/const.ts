export const transTimeOptions = [
  { value: '0', label: $t('今日') },
  { value: '1', label: $t('昨日') },
  { value: '2', label: $t('近7日') },
  { value: '3', label: $t('近30日') },
  { value: '4', label: $t('近60日') },
]

export const bonusTimeOptions = [
  { value: '0', label: $t('今日') },
  { value: '1', label: $t('昨日') },
  { value: '2', label: $t('近7日') },
  { value: '3', label: $t('近30日') },
]

export const orderStatus = [
  { value: '0', label: $t('所有状态') },
  { value: '1', label: $t('成功') },
  { value: '2', label: $t('失败') },
]

export const depositOptions = [
  { value: '0', label: $t('所有状态') },
  { value: '1', label: $t('失败') },
  { value: '2', label: $t('成功') },
  { value: '3', label: $t('处理中') },
  { value: '4', label: $t('已过期') },
]

export const withdrawalOptions = [
  { value: '0', label: $t('所有状态') },
  { value: '1', label: $t('失败') },
  { value: '2', label: $t('成功') },
  { value: '3', label: $t('处理中') },
]

export const betOptions = [
  { value: '0', label: $t('全部') },
  { value: '1', label: $t('已结算') },
  { value: '2', label: $t('未结算') },
]

export const bonusActivityOptions = [
  { value: '0', label: $t('全部奖金') },
  { value: '1', label: $t('待领取') },
  { value: '2', label: $t('已过期') },
  { value: '3', label: $t('已领取') },
]

interface IDetailRemark {
  status: string
  remark?: string | null
}
export const updateRemarkColor = (
  detail: IDetailRemark,
  validStatus: string[],
) =>
  validStatus.includes(detail.status) && null != detail.remark
    ? detail.status
    : ''
