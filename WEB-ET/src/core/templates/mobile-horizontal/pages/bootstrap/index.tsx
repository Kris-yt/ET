/*
 * @Date: 2024-07-26 09:31:39
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/bootstrap/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGlobal from '@/core/hooks/useGlobal'
import Background from '@base-ui/components/background'
import Button from '@shadow/components/button'
import configs from './configs'
import style from './style.module.scss'
import PrivacyPolicy from '@templates/components/business-modals/privacy-policy'
import TermServices from '@templates/components/business-modals/term-services'
export default () => {
  // const { t } = useTranslation();
  const { useSelector } = useGlobal()
  const navigate = useNavigate()
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState<boolean>(false)
  const [termServicesModal, setTermServicesModal] = useState<boolean>(false)

  const userId = useSelector((state) => state.user.info?.userid)

  useEffect(() => {
    if (userId) {
      navigate('/home')
    }
  }, [userId])

  return (
    <>
      <Background
        className={style['bootstrap-container']}
        tag="div"
        src={configs.background}
      >
        <div className="logo"></div>
        <$T>
          <div className="actions">
            <div className="buttons">
              <Button onClick={() => navigate('/home/login')}>登录</Button>
              <Button type="cancel" onClick={() => navigate('/home/login')}>
                注册
              </Button>
            </div>
            <Link className="visitor" to="/home">
              游客
            </Link>
            <div className="copyright">
              <span onClick={() => setTermServicesModal(true)}>
                {$t('网站协议')}
              </span>
              &nbsp;and&nbsp;
              <span onClick={() => setPrivacyPolicyModal(true)}>
                {$t('隐私政策')}
              </span>
            </div>
          </div>
        </$T>
      </Background>
      {termServicesModal && (
        <TermServices onClose={() => setTermServicesModal(false)} />
      )}
      {privacyPolicyModal && (
        <PrivacyPolicy onClose={() => setPrivacyPolicyModal(false)} />
      )}
    </>
  )
}
