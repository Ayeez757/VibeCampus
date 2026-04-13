import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Web 前台 ──
    { path: '/', name: 'home', component: HomeView },
    { path: '/userlogin', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
    { path: '/c/:id', name: 'post-detail', component: () => import('../views/PostDetailView.vue') },
    { path: '/post/create', name: 'create-post', component: () => import('../views/CreatePostView.vue') },
    { path: '/User/profile', name: 'user-profile', component: () => import('../views/UserProfileView.vue') },
    { path: '/users/:id', name: 'public-user-profile', component: () => import('../views/UserProfileView.vue') },
    { path: '/message', name: 'message', component: () => import('../views/MessageView.vue') },
    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },

    // ── 后台管理端 ──
    { path: '/admin/login', name: 'admin-login', component: () => import('../views/admin/AdminLoginView.vue') },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('../views/admin/DashboardView.vue') },
        { path: 'content', name: 'admin-content', component: () => import('../views/admin/ContentManageView.vue') },
        { path: 'category', name: 'admin-category', component: () => import('../views/admin/CategoryManageView.vue') },
        { path: 'comments', name: 'admin-comments', component: () => import('../views/admin/CommentManageView.vue') },
        { path: 'users', name: 'admin-users', component: () => import('../views/admin/UserManageView.vue') },
        { path: 'roles', name: 'admin-roles', component: () => import('../views/admin/RoleManageView.vue') },
        { path: 'sensitive', name: 'admin-sensitive', component: () => import('../views/admin/SensitiveWordsView.vue') },
        { path: 'announcement', name: 'admin-announcement', component: () => import('../views/admin/AnnouncementView.vue') },
        { path: 'logs', name: 'admin-logs', component: () => import('../views/admin/LogManageView.vue') },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
