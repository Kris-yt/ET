/*
 * @Date: 2024-07-31 11:25:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/select/mini/index.tsx
 * @Description:
 */
import { useState } from 'react'
import type { IProps } from '../types'
import style from './style.module.scss'

export default (props: IProps) => {
  const { options = [], onSelected, ...rest } = props

  const [showOptions, setShowOptions] = useState(false)
  const handleSelect = (value) => {
    onSelected && onSelected(value)
    setShowOptions(false)
  }

  return (
    <div className={`${style['select-container-mini']}`}>
      <span
        className={style['select-value']}
        onClick={() => setShowOptions(true)}
      >
        {options.find((option) => option.value === rest.value)?.label}
        <img
          draggable={false}
          className={style['arrow-more']}
          src={require('./i/icon-arrow.png?format=webp')}
          alt="Dropdown arrow"
        />
      </span>
      {showOptions && (
        <>
          <div className={style['select-options']}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${style['option-item']} ${option.value === rest.value ? style['selected'] : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
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
