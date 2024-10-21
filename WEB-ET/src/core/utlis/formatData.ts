import dayjs from 'dayjs'
import type { ManipulateType } from 'dayjs'

const DEFAULT_DISPLAY_VALUE = '--'
export const DEFAULT_DATE_UNIT = 'day'
export const SEARCH_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY\nHH:mm:ss'
const TRANS_DATE_RANGES = [0, 1, 7, 30, 60]
const BONUS_DATE_RANGES = [0, 1, 7, 30]

export const transTimeMapping = mapDateRanges(TRANS_DATE_RANGES)
export const bonusTimeMapping = mapDateRanges(BONUS_DATE_RANGES)

function mapDateRanges(
  ranges: Array<number>,
  unit: ManipulateType = DEFAULT_DATE_UNIT,
  fmt = SEARCH_DATE_FORMAT,
) {
  return ranges.map((range) => getDateRng(range, unit, fmt))
}

function getDateRng(
  dayBefore = 0,
  unit: ManipulateType = DEFAULT_DATE_UNIT,
  fmt = SEARCH_DATE_FORMAT,
) {
  const starttime = dayjs().subtract(dayBefore, unit).startOf(unit).format(fmt)
  let endtime: string
  const dayOffset = 1
  if (dayBefore <= dayOffset) {
    endtime = dayjs().subtract(dayBefore, unit).endOf(unit).format(fmt)
  } else {
    endtime = dayjs().endOf(unit).format(fmt)
  }

  return {
    starttime,
    endtime,
  }
}

export const displayCurrency = (money = 0, minimumFractionDigits = 2) => {
  const validMoney = isNaN(Number(money)) ? 0 : Number(money)
  return new Intl.NumberFormat('en-US', { minimumFractionDigits }).format(
    validMoney,
  )
}

export const displayValue = (value: string): string =>
  value || DEFAULT_DISPLAY_VALUE

export const displayDateTime = (
  dateTime: string = '',
  fmt = DEFAULT_DATE_FORMAT,
) => {
  const formatted = dayjs(dateTime)
  return formatted.isValid() ? formatted.format(fmt) : DEFAULT_DISPLAY_VALUE
}
