/*
 * @Date: 2024-08-02 09:52:04
 * @FilePath: /AS-WEB-3.5/src/core/constants/global.d.ts
 * @Description:
 */
export type TGlobalValue = {
  REQUEST_CANCLE_TOKEN: Record<string, any>
  LANGUAGE: 'zh-CN' | 'en-US' | 'th' | 'hi' | 'vi' | 'ko' | 'ja' | 'zh-HK'
}

export type TGlobalKeys = keyof TGlobalValue
export type TGlobalValues<K extends TGlobalKeys> = TGlobalValue[K]
