import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '@shadow/components/panel/index'
import InfoBind from '@shadow/pages/withdraw/info-bind/index'
import type { IProps } from './types'

export default ({ onBack }: IProps) => {
  const navigate = useNavigate()

  const handleOnBack = useCallback(() => {
    onBack ? onBack() : navigate('/wallet')
  }, [])

  return (
    <Panel
      type="page"
      mode="board"
      title="Fund Accounts"
      isShowBack
      onBack={handleOnBack}
      display
    >
      <InfoBind page="funAccounts" />
    </Panel>
  )
}
