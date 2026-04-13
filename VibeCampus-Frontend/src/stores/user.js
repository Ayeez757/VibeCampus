import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ⚠️ 前端测试用：默认模拟已登录用户，对接后端时删除 MOCK_USER 改为空值
const MOCK_USER = {
  id: 1,
  username: '测试同学',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  phone: '138****1234',
  email: 'demo@campus.com',
  gender: '男',
  bio: '热爱分享的大三学生，常在图书馆和操场出没。',
}
const MOCK_TOKEN = 'mock-dev-token'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || MOCK_TOKEN)
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null') || MOCK_USER)

  const isLoggedIn = computed(() => !!token.value)

  function login(data) {
    token.value = data.token
    userInfo.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('userInfo', JSON.stringify(data.user))
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  function updateUserInfo(patch) {
    userInfo.value = { ...(userInfo.value || {}), ...patch }
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }

  return { token, userInfo, isLoggedIn, login, logout, updateUserInfo }
})
