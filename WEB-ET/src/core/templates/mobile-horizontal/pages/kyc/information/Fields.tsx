/*
 * @Date: 2024-08-06 16:07:45
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/information/Fields.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import Select from '@shadow/components/select'
import InputText from '@shadow/components/input-text'
import InputArea from '../../../components/input-area'
import Datepicker from '@shadow/components/date-picker'
import Background from '@base-ui/components/background'
import { workOptions, incomeSourceOptions, genderOptions } from './const'
import { nationalityOptions } from './national'
import { getDisplay } from './utlis'
import { IFieldProps, TFieldProps } from './types'
import style from './style.module.scss'
import { EKycState } from '@/core/reducers/enum'
interface IFItemProps {
  item: TFieldProps
  value: string
  set: any
  status: number
}
export const FieldItem = ({ item, value, set, status }: IFItemProps) => {
  const handleclick = (item: any, status: number) => {
    if (EKycState.NOT_SUBMIT === status) {
      set(item)
      return
    } else if (EKycState.SCCUESS === status) {
      if (
        item.field === 'permanent_address' ||
        item.field === 'current_address' ||
        item.field === 'full_name' ||
        item.field === 'birth_place' ||
        item.field === 'work' ||
        item.field === 'income_source' ||
        item.field === 'nationality'
      ) {
        set(item)
        return
      } else {
        return
      }
    }
  }
  return (
    <div className={style['item']}>
      <div className={style['title']}>{item.name}</div>
      <div className={style['content']}>
        <div
          className={`${style['set']} ${item.field === 'birthday' && style['brithday']}`}
          // onClick={() => set(item)}
          onClick={() => handleclick(item, status)}
        >
          <span>{getDisplay(item.field, value)}</span>
          <Background
            className={style['icon']}
            tag={'div'}
            src={require('./i/icon.png?format=webp')}
          ></Background>
        </div>
      </div>
    </div>
  )
}

export const Nationality = ({ data, setData, kycstatus }: IFieldProps) => {
  return (
    <Select
      options={nationalityOptions}
      value={data}
      specialStyle={1 === kycstatus ? 'disabled' : ''}
      onSelected={(value) => setData(value)}
      placeholder={$t('请选择国籍')}
    />
  )
}

export const Birthday = ({ data, setData }: IFieldProps) => {
  return (
    <Datepicker
      value={data}
      onChange={(values) => setData(values)}
      placeholder={$t('请输入您的生日')}
    />
  )
}

export const Work = ({ data, setData, kycstatus }: IFieldProps) => {
  return (
    <Select
      options={workOptions}
      value={data}
      specialStyle={1 === kycstatus ? 'disabled' : ''}
      onSelected={(value) => setData(value)}
      placeholder={$t('请选择职业')}
    />
  )
}

export const Birth = ({ data, kycstatus, setData }: IFieldProps) => {
  return (
    <InputArea
      value={data}
      onChange={(values) => setData(values)}
      shape="rectangle"
      rows={6}
      readOnly={1 === kycstatus}
      placeholder={$t('请输入出生地')}
    />
  )
}

export const PermanentAddress = ({ data, kycstatus, setData }: IFieldProps) => {
  return (
    <InputArea
      value={data}
      onChange={(values) => setData(values)}
      shape="rectangle"
      rows={6}
      readOnly={1 === kycstatus}
      placeholder={$t('请输入户籍地址')}
    />
  )
}

export const Address = ({ data, kycstatus, setData }: IFieldProps) => {
  return (
    <InputArea
      value={data}
      onChange={(values) => setData(values)}
      shape="rectangle"
      rows={6}
      readOnly={1 === kycstatus}
      placeholder={$t('请输入联络地址')}
    />
  )
}

export const Name = ({ data, kycstatus, setData }: IFieldProps) => {
  const [firstName, setFirstName] = useState(data.split(' ')[0] || '')
  const [middleName, setMiddleName] = useState(data.split(' ')[1] || '')
  const [lastName, setLastName] = useState(data.split(' ')[2] || '')

  useEffect(() => {
    setData(`${firstName} ${middleName} ${lastName}`)
  }, [firstName, middleName, lastName])

  return (
    <div>
      <div className={style['input-name']}>
        <div
          style={{
            color: '#EB212D',
            fontSize: '14px',
            fontFamily: 'PingFang SC',
            position: 'relative',
            top: '15px',
            left: '-11px',
          }}
        >
          *
        </div>
        <InputText
          value={firstName}
          maxLength={30}
          onChange={(values) => setFirstName(values.toUpperCase())}
          placeholder={$t('名字')}
          disabled={1 === kycstatus}
        />
      </div>
      <div className={style['input-name']}>
        <div
          style={{
            color: 'transparent',
            position: 'relative',
            top: '15px',
            left: '-11px',
          }}
        >
          *
        </div>
        <InputText
          value={middleName}
          maxLength={30}
          onChange={(values) => setMiddleName(values.toUpperCase())}
          placeholder={$t('中间名')}
          disabled={1 === kycstatus}
        />
      </div>
      <div className={style['input-name']}>
        <div
          style={{
            color: '#EB212D',
            fontSize: '14px',
            fontFamily: 'PingFang SC',
            position: 'relative',
            top: '15px',
            left: '-11px',
          }}
        >
          *
        </div>
        <InputText
          value={lastName}
          maxLength={30}
          onChange={(values) => setLastName(values.toUpperCase())}
          placeholder={$t('姓氏')}
          disabled={1 === kycstatus}
        />
      </div>
    </div>
  )
}

export const Income = ({ data, setData, kycstatus }: IFieldProps) => {
  return (
    <Select
      options={incomeSourceOptions}
      value={data}
      specialStyle={1 === kycstatus ? 'disabled' : ''}
      onSelected={(value) => setData(value)}
      placeholder={$t('请选择收入來源')}
    />
  )
}

export const Gender = ({ data, setData }: IFieldProps) => {
  return (
    <div className={style['gender-container']}>
      {genderOptions.map((item) => (
        <div
          className={style['option-item']}
          onClick={() => setData(item.value)}
          key={item.value}
        >
          <input
            type="radio"
            id="male"
            name="gender"
            value={item.value}
            checked={item.value === data}
            onChange={() => setData(item.value)}
          />
          <label htmlFor={item.label}>{item.label}</label>
        </div>
      ))}
    </div>
  )
}
