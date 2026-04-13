import http from './index'

/**
 * 帖子模块 API
 */
const postApi = {
  /**
   * 获取帖子列表（首页 feed）
   * GET /posts
   * @param {{ category?: string, page?: number, pageSize?: number }} params
   * @returns {{ list: Post[], total: number, page: number, pageSize: number }}
   */
  getList(params = {}) {
    return http.get('/posts', { params })
  },

  /**
   * 获取帖子详情
   * GET /posts/:id
   * @param {string|number} id
   * @returns {Post}
   */
  getDetail(id) {
    return http.get(`/posts/${id}`)
  },

  /**
   * 发布帖子（支持图片/视频，使用 multipart/form-data）
   * POST /posts
   * @param {FormData} formData  包含字段：category, content, anonymous, images[], video?
   * @returns {Post}
   */
  create(formData) {
    return http.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * 删除自己的帖子
   * DELETE /posts/:id
   */
  remove(id) {
    return http.delete(`/posts/${id}`)
  },

  /**
   * 点赞 / 取消点赞
   * POST /posts/:id/like
   * @returns {{ liked: boolean, likeCount: number }}
   */
  toggleLike(id) {
    return http.post(`/posts/${id}/like`)
  },

  /**
   * 收藏 / 取消收藏
   * POST /posts/:id/favorite
   * @returns {{ favorited: boolean }}
   */
  toggleFavorite(id) {
    return http.post(`/posts/${id}/favorite`)
  },

  /**
   * 搜索帖子
   * GET /posts/search
   * @param {{ keyword: string, sort?: 'latest'|'likes'|'comments', page?: number, pageSize?: number }} params
   * @returns {{ list: Post[], total: number }}
   */
  search(params) {
    return http.get('/posts/search', { params })
  },

  /**
   * 获取热门帖子排行榜（侧边栏用）
   * GET /posts/hot
   * @param {{ limit?: number }} params
   * @returns {HotPost[]}
   */
  getHotList(params = { limit: 10 }) {
    return http.get('/posts/hot', { params })
  },
}

export default postApi
