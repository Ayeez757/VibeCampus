import http from './index'

/**
 * 评论模块 API
 */
const commentApi = {
  /**
   * 获取帖子的评论列表（含嵌套回复）
   * GET /posts/:postId/comments
   * @param {string|number} postId
   * @param {{ page?: number, pageSize?: number }} params
   * @returns {{ list: Comment[], total: number }}
   */
  getList(postId, params = {}) {
    return http.get(`/posts/${postId}/comments`, { params })
  },

  /**
   * 发布评论
   * POST /posts/:postId/comments
   * @param {string|number} postId
   * @param {{ content: string }} data
   * @returns {Comment}
   */
  create(postId, data) {
    return http.post(`/posts/${postId}/comments`, data)
  },

  /**
   * 回复评论（二级评论）
   * POST /comments/:commentId/replies
   * @param {string|number} commentId  被回复的一级评论 ID
   * @param {{ content: string, replyToUserId?: number }} data
   * @returns {Reply}
   */
  reply(commentId, data) {
    return http.post(`/comments/${commentId}/replies`, data)
  },

  /**
   * 点赞 / 取消点赞评论
   * POST /comments/:commentId/like
   * @returns {{ liked: boolean, likeCount: number }}
   */
  toggleLike(commentId) {
    return http.post(`/comments/${commentId}/like`)
  },

  /**
   * 删除自己的评论
   * DELETE /comments/:commentId
   */
  remove(commentId) {
    return http.delete(`/comments/${commentId}`)
  },
}

export default commentApi
