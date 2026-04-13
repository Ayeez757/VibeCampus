import http from './index'

/**
 * 用户模块 API
 */
const userApi = {
  /**
   * 获取当前登录用户信息
   * GET /user/me
   * @returns {UserInfo}
   */
  getMe() {
    return http.get('/user/me')
  },

  /**
   * 更新个人资料
   * PUT /user/me
   * @param {{ username?: string, phone?: string, email?: string, gender?: string, bio?: string }} data
   * @returns {UserInfo}
   */
  updateProfile(data) {
    return http.put('/user/me', data)
  },

  /**
   * 上传/更换头像
   * POST /user/me/avatar
   * @param {FormData} formData  包含字段：avatar（File）
   * @returns {{ avatarUrl: string }}
   */
  uploadAvatar(formData) {
    return http.post('/user/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * 修改密码
   * PUT /user/me/password
   * @param {{ oldPassword: string, newPassword: string }} data
   */
  changePassword(data) {
    return http.put('/user/me/password', data)
  },

  /**
   * 获取我发布的帖子
   * GET /user/me/posts
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: Post[], total: number }}
   */
  getMyPosts(params = {}) {
    return http.get('/user/me/posts', { params })
  },

  /**
   * 获取我的评论记录
   * GET /user/me/comments
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: Comment[], total: number }}
   */
  getMyComments(params = {}) {
    return http.get('/user/me/comments', { params })
  },

  /**
   * 获取我的收藏列表
   * GET /user/me/favorites
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: Post[], total: number }}
   */
  getMyFavorites(params = {}) {
    return http.get('/user/me/favorites', { params })
  },

  /**
   * 查看指定用户的公开主页（可选）
   * GET /users/:userId
   * @param {string|number} userId
   * @returns {PublicUserInfo}
   */
  getPublicProfile(userId) {
    return http.get(`/users/${userId}`)
  },
}

export default userApi
