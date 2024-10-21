/*
 * @Date: 2024-08-06 11:55:18
 * @FilePath: /AS-WEB-3.5/src/core/services/event-mitt/types.d.ts
 * @Description:
 */
export type TMiit = {
  openLogin: null
  closeLogin: null
  loginSuccess: null
  openPromotion: null
  openRegister: null
  closeRegister: null
  registerSuccess: null
  closeDeposit: null
  logout: {
    popup: boolean
  }
  navigate: string
  openForgetPassword: null
  closeForgetPassword: null
  openForce: null
  closeForce: null
  openSuggest: null
  closeSuggest: null
  openDesposit: null
}

export type TMittEvent = keyof TMiit
export type TMittEventValue<T extends TMittEvent> = TMiit[T]
