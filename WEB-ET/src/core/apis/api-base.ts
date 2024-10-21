/*
 * @Date: 2024-07-31 16:32:58
 * @FilePath: /AS-WEB-3.5/src/core/apis/api-base.ts
 * @Description:
 */

export default {
  // 系统设置
  'rest/get-settings':
    'api/settings/?fields=customer_service_url,public_key,promption_code,default_promption_code,phstorelist',

  // 通用请求，不允许操作reducer
  'rest/common-request': '$',

  // 通用请求，不允许操作reducer
  'classic/common-request': '$',
}
