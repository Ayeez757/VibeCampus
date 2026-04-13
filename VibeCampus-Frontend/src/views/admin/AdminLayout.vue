<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const sidebarCollapsed = ref(false)
const userDropdownOpen = ref(false)

const menuGroups = [
  {
    label: '校园信息墙',
    items: [
      { path: '/admin', label: '工作台', icon: 'dashboard' },
      { path: '/admin/content', label: '内容管理', icon: 'document' },
      { path: '/admin/category', label: '类别管理', icon: 'tag' },
      { path: '/admin/comments', label: '评论管理', icon: 'chat' },
    ],
  },
  {
    label: '系统管理',
    items: [
      { path: '/admin/users', label: '用户管理', icon: 'users' },
      { path: '/admin/roles', label: '角色管理', icon: 'shield' },
      { path: '/admin/sensitive', label: '敏感词管理', icon: 'filter' },
      { path: '/admin/announcement', label: '公告管理', icon: 'megaphone' },
      { path: '/admin/logs', label: '日志管理', icon: 'log' },
    ],
  },
]

const currentTitle = computed(() => {
  for (const g of menuGroups) {
    const item = g.items.find(i => i.path === route.path)
    if (item) return item.label
  }
  return '工作台'
})

const breadcrumbs = computed(() => {
  for (const g of menuGroups) {
    const item = g.items.find(i => i.path === route.path)
    if (item) return [g.label, item.label]
  }
  return ['校园信息墙', '工作台']
})

function logout() {
  router.push('/admin/login')
}
</script>

<template>
  <div class="flex h-screen bg-slate-100 overflow-hidden">
    <!-- Sidebar -->
    <aside :class="[
      'flex-shrink-0 flex flex-col bg-slate-900 transition-all duration-300',
      sidebarCollapsed ? 'w-16' : 'w-56',
    ]">
      <!-- Logo -->
      <div class="h-14 flex items-center justify-between px-4 border-b border-slate-700">
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
            </svg>
          </div>
          <span v-if="!sidebarCollapsed" class="text-white font-semibold text-sm whitespace-nowrap">管理后台</span>
        </div>
        <button @click="sidebarCollapsed = !sidebarCollapsed"
          class="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              :d="sidebarCollapsed ? 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' : 'M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5'" />
          </svg>
        </button>
      </div>

      <!-- Menu -->
      <nav class="flex-1 overflow-y-auto py-3 px-2">
        <div v-for="group in menuGroups" :key="group.label" class="mb-4">
          <p v-if="!sidebarCollapsed" class="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 mb-1.5">
            {{ group.label }}
          </p>
          <div v-else class="border-t border-slate-700 my-2" />
          <RouterLink
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors cursor-pointer mb-0.5',
              route.path === item.path
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
            ]"
            :title="sidebarCollapsed ? item.label : ''"
          >
            <!-- Icons -->
            <span class="shrink-0 w-5 h-5 flex items-center justify-center">
              <svg v-if="item.icon === 'dashboard'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <svg v-else-if="item.icon === 'document'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <svg v-else-if="item.icon === 'tag'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <svg v-else-if="item.icon === 'chat'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <svg v-else-if="item.icon === 'users'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <svg v-else-if="item.icon === 'shield'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <svg v-else-if="item.icon === 'filter'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <svg v-else-if="item.icon === 'megaphone'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </span>
            <span v-if="!sidebarCollapsed" class="whitespace-nowrap">{{ item.label }}</span>
          </RouterLink>
        </div>
      </nav>

      <!-- Bottom: user info -->
      <div class="border-t border-slate-700 p-3">
        <div v-if="!sidebarCollapsed" class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">管</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-white font-medium truncate">超级管理员</p>
            <p class="text-xs text-slate-500 truncate">admin</p>
          </div>
          <button @click="logout" class="text-slate-500 hover:text-red-400 cursor-pointer transition-colors" title="退出登录">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
        <button v-else @click="logout" class="w-full flex justify-center text-slate-500 hover:text-red-400 cursor-pointer transition-colors py-1">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar -->
      <header class="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-sm text-slate-500">
          <span v-for="(crumb, i) in breadcrumbs" :key="i" class="flex items-center gap-1.5">
            <span :class="i === breadcrumbs.length - 1 ? 'text-slate-800 font-medium' : ''">{{ crumb }}</span>
            <svg v-if="i < breadcrumbs.length - 1" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Notification -->
          <button class="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition cursor-pointer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
          <!-- Fullscreen -->
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition cursor-pointer"
            @click="document.documentElement.requestFullscreen?.()">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          </button>
          <!-- Avatar dropdown -->
          <div class="relative">
            <button @click="userDropdownOpen = !userDropdownOpen"
              class="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition">
              <div class="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">管</div>
              <span class="text-sm text-slate-700 hidden md:block">超级管理员</span>
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div v-if="userDropdownOpen"
              class="absolute right-0 top-10 w-40 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50">
              <button class="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 cursor-pointer">个人中心</button>
              <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer">退出登录</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-5">
        <RouterView />
      </main>
    </div>
  </div>
</template>
