/*
 * @Date: 2024-08-05 18:49:24
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/copy/index.tsx
 * @Description:
 */
import useGlobal from '@/core/hooks/useGlobal'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IProps } from './types'

export default (props: IProps) => {
  const { text, children, onCopy } = props

  const { dispatch, ACTIONS } = useGlobal()

  const handleDefualtCopy = () => {
    if (!text) {
      return
    }
    if (onCopy) {
      onCopy()
      return
    }
    dispatch(
      ACTIONS.BASE.openToast({ text: $t('已复制内容剪贴板'), type: 'success' }),
    )
  }

  return (
    <CopyToClipboard text={text} onCopy={handleDefualtCopy}>
      {children}
    </CopyToClipboard>
  )
}
