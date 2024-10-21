/*
 * @Date: 2024-07-31 16:32:58
 * @FilePath: /AS-WEB-3.5/src/core/apis/api-user.ts
 * @Description:
 */

export default {
  // 登录
  ['rest/login']: 'api/auth/login',

  // 注册
  ['rest/register']: 'api/register/$',

  // 获取个人信息
  ['rest/profile']: 'api/account/profile',

  // 刷新session
  ['rest/get-session']: 'api/auth/sessid',
  // 获取kyc类型
  ['rest/get-kyc-type']: 'api/kyc/gettype',

  // 申请KYC
  ['rest/apply-kyc']: 'api/kyc/apply',

  // 重置 KYC
  ['rest/reset-kyc']: 'api/kyc/reset',

  // 获取 KYC 申请状态
  ['rest/get-kyc-apply-status']: 'api/kyc/applystatus',

  // 获取 KYC 申请记录
  ['rest/get-kyc-apply-record']: 'api/kyc/applyrecord',

  // 获取 KYC 申请人信息
  ['rest/get-kyc-apply-info']: 'api/kyc/applyinfo',
  // 获取 KYC
  ['rest/get-kyc']: 'api/kyc/getinfo',

  //获取VIP等级
  ['rest/get-vip']: 'api/account/vipinfo',

  // 用手机验证码找回登录密码
  ['rest/find-forget-pass-by-phone']: 'api/account/newforgetpassword',

  // 获取所有充值渠道
  ['rest/get-all-pay-channel']: 'api/deposit/list?getinfo=true',
  // 提交充值订单
  ['rest/submit-recharge-order']: 'api/deposit/submit/$',

  // 提款提交
  ['rest/withdrawal']: 'api/withdrawal/submit',

  // 刷新余额
  ['rest/get-balance']: 'api/account/balance',

  //获取所有提现渠道
  ['rest/withdrawal-list']: 'api/withdrawal/list',

  // 获取未完成活动流水详情
  ['rest/get-activity-awardrecord']: 'api/activity/awardrecord',

  // 提款-获取可提款额度
  ['rest/withdrawal-quota']: 'api/withdrawal/quota',

  // 提款-STEP1获取提现渠道详情
  ['rest/withdrawal-step1']: 'api/withdrawal/info/$',
  // 提交实体地址
  ['rest/set-phstore']: 'api/account/set-phstore',
}
