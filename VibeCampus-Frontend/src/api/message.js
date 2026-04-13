import http from './index'

/**
 * 消息模块 API
 */
const messageApi = {
  // ── 互动通知 ────────────────────────────────────────────

  /**
   * 获取互动通知列表（点赞/评论/回复）
   * GET /notifications
   * @param {{ type?: 'like'|'comment'|'reply', page?: number, pageSize?: number }} params
   * @returns {{ list: Notification[], total: number, unreadCount: number }}
   */
  getNotifications(params = {}) {
    return http.get('/notifications', { params })
  },

  /**
   * 标记全部互动通知为已读
   * PUT /notifications/read-all
   */
  markNotificationsRead() {
    return http.put('/notifications/read-all')
  },

  // ── 私信 ────────────────────────────────────────────────

  /**
   * 获取私信会话列表
   * GET /messages/chats
   * @returns {{ list: ChatSession[] }}
   */
  getChatList() {
    return http.get('/messages/chats')
  },

  /**
   * 获取与某用户的聊天记录
   * GET /messages/chats/:userId
   * @param {string|number} userId
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: Message[], total: number }}
   */
  getChatMessages(userId, params = {}) {
    return http.get(`/messages/chats/${userId}`, { params })
  },

  /**
   * 发送私信
   * POST /messages/chats/:userId
   * @param {string|number} userId  收件人 ID
   * @param {{ content: string }} data
   * @returns {Message}
   */
  sendMessage(userId, data) {
    return http.post(`/messages/chats/${userId}`, data)
  },

  /**
   * 标记与某用户的私信全部已读
   * PUT /messages/chats/:userId/read
   */
  markChatRead(userId) {
    return http.put(`/messages/chats/${userId}/read`)
  },

  // ── 系统通知 ─────────────────────────────────────────────

  /**
   * 获取系统通知列表（公告/警告）
   * GET /messages/system
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: SystemMessage[], total: number, unreadCount: number }}
   */
  getSystemMessages(params = {}) {
    return http.get('/messages/system', { params })
  },

  /**
   * 标记系统通知已读
   * PUT /messages/system/:id/read
   */
  markSystemRead(id) {
    return http.put(`/messages/system/${id}/read`)
  },

  /**
   * 获取未读消息总数（用于导航栏徽标）
   * GET /messages/unread-count
   * @returns {{ total: number, notification: number, chat: number, system: number }}
   */
  getUnreadCount() {
    return http.get('/messages/unread-count')
  },
}

export default messageApi
