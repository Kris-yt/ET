/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/select-id/index.tsx
 * @Description:
 */
import { useRef, useCallback } from 'react'
import useGlobal from '@/core/hooks/useGlobal'
import Background from '@base-ui/components/background'
import Button from '@shadow/components/button'
import style from './style.module.scss'
import _ from 'lodash'
export default ({ setSubmitStep, formik }) => {
  const { dispatch, ACTIONS } = useGlobal()

  const fileholdRef = useRef<any>()

  const handleSelectFile = useCallback(() => {
    if (fileholdRef.current) {
      fileholdRef.current?.click()
    }
  }, [])

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0]
    const MAX_FILE_SIZE = 5 * 1024 * 1024
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.tiff',
      '.svg',
    ]
    const extension = file.name.slice(file.name.lastIndexOf('.'))
    if (file) {
      if (!imageExtensions.includes(extension)) {
        dispatch(
          ACTIONS.BASE.openToast({
            text: $t('请上传正确格式的图片'),
            type: 'error',
          }),
        )
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        dispatch(
          ACTIONS.BASE.openToast({
            text: $t('文件大小超出限制，请选择小于5MB的文件'),
            type: 'error',
          }),
        )
        file.current.value = ''
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        formik.setFieldValue('holding_id_photo', [base64String as string])
      }
      reader.readAsDataURL(file)
    }
  }, [])
  const handleNext = useCallback(() => {
    if (formik.values.holding_id_photo?.length === 0) {
      dispatch(
        ACTIONS.BASE.openToast({ text: $t('请上传手持证件照'), type: 'error' }),
      )
      return
    }
    setSubmitStep(4)
  }, [formik.values.holding_id_photo])

  return (
    <div className={style['item-container']}>
      <div className={style['item-title']}>
        Please upload the selfie with the chosen ID
      </div>
      <Background
        className={style['item-bg']}
        tag={'div'}
        src={
          formik.values.holding_id_photo[0] || require('./i/bg.png?format=webp')
        }
        onTouchEnd={handleSelectFile}
      >
        <input
          ref={fileholdRef}
          className={style['file-selector']}
          type="file"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg"
        />

        {!formik.values.holding_id_photo[0] && (
          <>
            <Background
              className={style['item-upload']}
              tag={'div'}
              src={require('./i/upload.png?format=webp')}
            ></Background>
            <div className={style['item-content']}>
              Please upload the selfie with the chosen ID
            </div>
          </>
        )}
      </Background>
      <Button onClick={_.throttle(handleNext, 2000)}>Submit</Button>
    </div>
  )
}
