/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/information/index.tsx
 * @Description:
 */
import { useState, useRef, useEffect } from 'react'
import MiniPanel from '@shadow/components/mini-panel'
import Button from '@shadow/components/button'
import {
  FieldItem,
  Nationality,
  Birthday,
  Work,
  Birth,
  PermanentAddress,
  Name,
  Gender,
  Income,
  Address,
} from './Fields'
import { fields } from './const'
import { TFieldProps } from './types'
import style from './style.module.scss'
import _ from 'lodash'
export default ({ formik, submit, kycstatus }) => {
  const [currentSet, setCurrentSet] = useState<TFieldProps | null>(null)
  const fixedData = useRef(formik.values)

  useEffect(() => {
    if (!currentSet) {
      return
    }
    fixedData.current = formik.values
  }, [currentSet])

  const handleClose = () => {
    setCurrentSet(null)
    formik.setValues(fixedData.current)
  }
  const handlefullname = (value: any) => {
    formik.setFieldValue('full_name', value)
    formik.setFieldValue('first_name', value.split(' ')[0])
    formik.setFieldValue('middle_name', value.split(' ')[1])
    formik.setFieldValue('last_name', value.split(' ')[2])
  }
  return (
    <div className={style['item-container']}>
      <div className={style['content-box']}>
        {['left', 'right'].map((position, index) => (
          <div key={index} className={style[`${position}-box`]}>
            {fields
              .filter((i) => i.position === position)
              .map((item, index) => (
                <FieldItem
                  key={index}
                  item={item}
                  value={formik.values[item.field]}
                  set={setCurrentSet}
                  status={kycstatus}
                />
              ))}
          </div>
        ))}
      </div>
      <div className={kycstatus === 1 ? style['none'] : style['block']}>
        <Button onClick={_.throttle(submit, 2000)}>{$t('提交')}</Button>
      </div>
      <MiniPanel
        title={currentSet?.name}
        display={!!currentSet}
        onClose={handleClose}
      >
        <div className={style['update-modal']}>
          <div className={style['modal-content']}>
            {currentSet?.field === 'birthday' && (
              <Birthday
                data={formik.values.birthday}
                setData={(value) => formik.setFieldValue('birthday', value)}
              />
            )}
            {currentSet?.field === 'nationality' && (
              <Nationality
                data={formik.values.nationality}
                kycstatus={kycstatus}
                setData={(value) => formik.setFieldValue('nationality', value)}
              />
            )}
            {currentSet?.field === 'work' && (
              <Work
                data={formik.values.work}
                kycstatus={kycstatus}
                setData={(value) => formik.setFieldValue('work', value)}
              />
            )}
            {currentSet?.field === 'birth_place' && (
              <Birth
                data={formik.values.birth_place}
                kycstatus={kycstatus}
                setData={(value) => formik.setFieldValue('birth_place', value)}
              />
            )}
            {currentSet?.field === 'permanent_address' && (
              <PermanentAddress
                data={formik.values.permanent_address}
                kycstatus={kycstatus}
                setData={(value) =>
                  formik.setFieldValue('permanent_address', value)
                }
              />
            )}
            {currentSet?.field === 'full_name' && (
              <Name
                data={formik.values.full_name}
                kycstatus={kycstatus}
                setData={(value) => handlefullname(value)}
              />
            )}
            {currentSet?.field === 'gender' && (
              <Gender
                data={formik.values.gender}
                setData={(value) => formik.setFieldValue('gender', value)}
              />
            )}
            {currentSet?.field === 'income_source' && (
              <Income
                data={formik.values.income_source}
                kycstatus={kycstatus}
                setData={(value) =>
                  formik.setFieldValue('income_source', value)
                }
              />
            )}
            {currentSet?.field === 'current_address' && (
              <Address
                data={formik.values.current_address}
                kycstatus={kycstatus}
                setData={(value) =>
                  formik.setFieldValue('current_address', value)
                }
              />
            )}
          </div>
          <div className={style['actions']}>
            <Button
              className={style['button']}
              onClick={() => setCurrentSet(null)}
            >
              {$t('保存')}
            </Button>
          </div>
        </div>
      </MiniPanel>
    </div>
  )
}
