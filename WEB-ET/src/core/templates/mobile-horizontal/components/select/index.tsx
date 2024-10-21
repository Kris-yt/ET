/*
 * @Date: 2024-07-31 11:25:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/select/index.tsx
 * @Description:
 */
import { useState } from 'react'
import InputText from '@shadow/components/input-text'
import type { IProps } from './types'
import style from './style.module.scss'

export default (props: IProps) => {
  const { options = [], specialStyle = '', onSelected, ...rest } = props

  const [showOptions, setShowOptions] = useState(false)
  const handleSelect = (value) => {
    onSelected && onSelected(value)
    setShowOptions(false)
  }

  return (
    <div className={`${style['select-container']} ${style[specialStyle]}`}>
      <span onClick={() => setShowOptions(true)}>
        <InputText
          {...rest}
          value={
            options.find((option) => option.value === rest.value)?.label || ''
          }
          specialStyle={specialStyle}
          readOnly={true}
          shape={
            specialStyle === 'withdraw-input-container' ? 'sharp' : 'circle'
          }
          rightNode={
            <img
              className={style['arrow-more']}
              src={require('./i/icon-arrow.png?format=webp')}
            />
          }
        />
      </span>
      {showOptions && (
        <>
          <div className={style['select-options']}>
            {options.map((option) => {
              if ('status' in option && !option.status) {
                return (
                  <div
                    key={option.value}
                    className={`${style['option-item']}`}
                    style={{ color: '#DEB479' }}
                  >
                    {option.label}
                  </div>
                )
              } else {
                return (
                  <div
                    key={option.value}
                    className={`${style['option-item']} ${option.value === rest.value ? style['selected'] : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                )
              }
            })}
          </div>
          <div
            className={style['overlay']}
            onClick={() => setShowOptions(false)}
          />
        </>
      )}
    </div>
  )
}
