/*
 * @Date: 2024-10-08 11:12:47
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/verity-code/types.d.ts
 * @Description:
 */
export interface IProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  onSucess: (token?: string) => void
  verifyType?: ESendPhoneCodeFlag
}
