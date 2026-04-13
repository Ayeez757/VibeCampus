import http from './index'

/**
 * 认证模块 API
 *
 * 后端约定返回结构：
 * { code: 0, message: 'ok', data: { ... } }
 */
const authApi = {
  /**
   * 登录
   * POST /auth/login
   * @param {{ account: string, password: string, captcha: string }} data
   * @returns {{ token: string, user: UserInfo }}
   */
  login(data) {
    return http.post('/auth/login', data)
  },

  /**
   * 注册
   * POST /auth/register
   * @param {{ username: string, phone: string, password: string, captcha: string }} data
   */
  register(data) {
    return http.post('/auth/register', data)
  },

  /**
   * 获取图形验证码（以 base64 图片返回）
   * GET /auth/captcha
   * @returns {{ captchaId: string, image: string }}
   */
  getCaptcha() {
    return http.get('/auth/captcha')
  },

  /**
   * 发送短信验证码
   * POST /auth/sms
   * @param {{ phone: string }} data
   */
  sendSms(data) {
    return http.post('/auth/sms', data)
  },

  /**
   * 验证短信验证码（找回密码第二步）
   * POST /auth/sms/verify
   * @param {{ phone: string, code: string }} data
   * @returns {{ resetToken: string }}  用于后续重置密码的临时 token
   */
  verifySmsCode(data) {
    return http.post('/auth/sms/verify', data)
  },

  /**
   * 重置密码（找回密码第三步）
   * POST /auth/reset-password
   * @param {{ resetToken: string, newPassword: string }} data
   */
  resetPassword(data) {
    return http.post('/auth/reset-password', data)
  },

  /**
   * 退出登录（服务端使 token 失效）
   * POST /auth/logout
   */
  logout() {
    return http.post('/auth/logout')
  },
}

export default authApi
