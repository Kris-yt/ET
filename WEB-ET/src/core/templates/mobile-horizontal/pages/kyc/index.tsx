/*
 * @Date: 2024-07-31 23:10:15
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/index.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import useGlobal from '@/core/hooks/useGlobal'
import useKYC from '@/core/hooks/useKYC'
import Panel from '@shadow/components/panel'
import Instruction from '@shadow/pages/kyc/instruction/index' // KYC说明页
import SelectID from '@shadow/pages/kyc/select-id/index' // KYC上传图片页
import Information from '@shadow/pages/kyc/information/index' // KYC填写信息页
import UnderReview from '@shadow/pages/kyc/under-review/index' // KYC审核页
import FailedReview from '@shadow/pages/kyc/failed-review/index' // KYC审核拒绝页
import SelfieId from '@shadow/pages/kyc/selfie-id/index' //上传手持证件招聘
import { EKycState } from '@/core/reducers/enum'
import style from './style.module.scss'
import dayjs from 'dayjs'
import MiniPanel from '@shadow/components/mini-panel' //弹框
import Button from '@shadow/components/button' //按钮
const pageRightNode = require('./i/kyc-right-bottom.png?format=webp')
export default () => {
  const { useSelector } = useGlobal()
  const kycStatus = useSelector((state) => state.user.info?.kyc_status)
  const kycstate = useSelector((state) => state.user?.kyc)
  const [submitStep, setSubmitStep] = useState(0)
  const [showKycPanel, setKycPanel] = useState<boolean>(false)
  const { formik, submit, getPersonalInfo } = useKYC()

  useEffect(() => {
    getPersonalInfo()
  }, [])
  useEffect(() => {
    if (kycStatus === EKycState.NOT_SUBMIT) {
      setSubmitStep(1)
    } else if (kycStatus === EKycState.SCCUESS) {
      if (kycstate) {
        formik.values.kyc_type_id = kycstate.kyc_type_id
        formik.values.file = kycstate.picture_list
        formik.values.nationality = kycstate.nationality
        formik.values.birthday = dayjs(kycstate.birthday).format('MM/DD/YYYY')
        formik.values.gender = kycstate.gender
        formik.values.work = kycstate.work
        formik.values.birth_place = kycstate.birth_place
        formik.values.permanent_address = kycstate.permanent_address
        formik.values.full_name = `${kycstate.first_name} ${kycstate.middle_name} ${kycstate.last_name}`
        formik.values.first_name = kycstate.first_name
        formik.values.middle_name = kycstate.middle_name
        formik.values.last_name = kycstate.last_name
        formik.values.income_source = kycstate.income_source
        formik.values.current_address = kycstate.current_address
      }
    }
  }, [kycStatus])
  const handleKyclose = () => {
    setKycPanel(false)
  }
  const handletoKyc = () => {
    window.location.href = '/webapp/#/user/security'
  }
  const handleBack = () => {
    if (kycStatus === EKycState.SCCUESS) {
      history.back()
    } else {
      setKycPanel(true)
    }
  }
  return (
    <>
      <Panel
        title="KYC verify"
        type="page"
        mode="board"
        display
        isShowBack
        onBack={handleBack}
        pageRightNode={<img width={142} height={60} src={pageRightNode} />}
      >
        <div className={style['kyc-container']}>
          {submitStep === 1 && <Instruction setSubmitStep={setSubmitStep} />}
          {submitStep === 2 && (
            <SelectID setSubmitStep={setSubmitStep} formik={formik} />
          )}
          {submitStep === 3 && (
            <SelfieId setSubmitStep={setSubmitStep} formik={formik} />
          )}
          {submitStep === 4 && (
            <Information
              formik={formik}
              submit={submit}
              kycstatus={EKycState.NOT_SUBMIT}
            />
          )}
          {kycStatus === EKycState.PENDING && <UnderReview />}
          {kycStatus === EKycState.SCCUESS && (
            <Information
              formik={formik}
              submit={submit}
              kycstatus={EKycState.SCCUESS}
            />
          )}
          {submitStep === 0 && kycStatus === EKycState.FAILED && (
            <FailedReview
              setSubmitStep={setSubmitStep}
              reason={kycstate?.remark || ''}
            />
          )}
        </div>
      </Panel>
      <MiniPanel
        title={'Tip'}
        display={showKycPanel}
        zIndex={1000}
        onClose={handleKyclose}
      >
        <div className={style['modal-container']}>
          <div className={style['modal-title']}>
            Are you sure give up KYC verify？
          </div>
          <div className={style['foot-container']}>
            <Button
              className={style['button']}
              type="cancel"
              onClick={handletoKyc}
            >
              {$t('放弃')}
            </Button>
            <Button className={style['button']} onClick={handleKyclose}>
              {$t('继续')}
            </Button>
          </div>
        </div>
      </MiniPanel>
    </>
  )
}
