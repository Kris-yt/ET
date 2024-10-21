/*
 * @Date: 2024-08-23 15:35:08
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/date-picker/index.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import Select from '@shadow/components/select'
import { IProps } from '@templates/components/input-text/types'
import 'react-datepicker/dist/react-datepicker.css'
import css from './style.module.scss'

export default (props: IProps) => {
  const [year, setYear] = useState(props.value.split('/')[2])
  const [month, setMonth] = useState(props.value.split('/')[0])
  const [day, setDay] = useState(props.value.split('/')[1])

  useEffect(() => {
    if (props.onChange) {
      props.onChange(`${month}/${day}/${year}`)
    }
  }, [year, month, day])

  useEffect(() => {
    if (month === '02' && Number(day) > 28) {
      setDay('28')
    }
    if (['04', '06', '09', '11'].includes(month) && Number(day) > 30) {
      setDay('30')
    }
  }, [month])

  const filterDayOptions = () => {
    if (month === '02') {
      return dayOptions.filter((i) => Number(i.value) <= 28)
    }
    if (['04', '06', '09', '11'].includes(month)) {
      return dayOptions.filter((i) => Number(i.value) <= 30)
    }
    return dayOptions
  }

  return (
    <div className={css['date-picker-container']}>
      <Select
        options={monthOptions}
        onSelected={(value: any) => setMonth(value)}
        value={month}
        placeholder="Month"
        shape="sharp"
      />
      <Select
        options={filterDayOptions()}
        onSelected={(value: any) => setDay(value)}
        value={day}
        placeholder="Day"
        shape="sharp"
      />
      <Select
        options={yearOptions}
        onSelected={(value: any) => setYear(value)}
        value={year}
        placeholder="Year"
        shape="sharp"
      />
    </div>
  )
}

// 从 01 到 31 的日期, 不足两位数的前面补 0
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1).map((i) => ({
  value: i.toString().padStart(2, '0'),
  label: i.toString().padStart(2, '0'),
}))

// 从01 到 12的月份, 不足两位数的前面补 0
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((i) => ({
  value: i.toString().padStart(2, '0'),
  label: i.toString().padStart(2, '0'),
}))

// 从 1900 到 今年
const yearOptions = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => 1900 + i,
)
  .reverse()
  .map((i) => ({
    value: i.toString(),
    label: i.toString(),
  }))
