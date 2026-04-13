<script setup>
import { ref } from 'vue'

const search = ref({ name: '', phone: '', status: '', startDate: '', endDate: '' })
const showRoleModal = ref(false)
const roleTarget = ref(null)

const users = ref([
  { id: 1, uid: 'U001', name: 'xiaoming', nickname: '小明', phone: '138****0001', status: true, role: '普通用户', createdAt: '2026-01-15' },
  { id: 2, uid: 'U002', name: 'shuma', nickname: '数码达人', phone: '139****0002', status: true, role: '普通用户', createdAt: '2026-01-20' },
  { id: 3, uid: 'U003', name: 'anon003', nickname: '匿名用户', phone: '136****0003', status: false, role: '普通用户', createdAt: '2026-02-01' },
  { id: 4, uid: 'U004', name: 'photo', nickname: '摄影爱好者', phone: '137****0004', status: true, role: '版主', createdAt: '2026-02-10' },
  { id: 5, uid: 'U005', name: 'kaoyaner', nickname: '考研人', phone: '135****0005', status: true, role: '普通用户', createdAt: '2026-03-01' },
])

const roles = ['普通用户', '版主', '超级管理员']

function toggleStatus(user) {
  user.status = !user.status
}

function openRoleModal(user) {
  roleTarget.value = { ...user }
  showRoleModal.value = true
}

function saveRole() {
  const u = users.value.find(u => u.id === roleTarget.value.id)
  if (u) u.role = roleTarget.value.role
  showRoleModal.value = false
}

function deleteUser(id) {
  const idx = users.value.findIndex(u => u.id === id)
  if (idx !== -1) users.value.splice(idx, 1)
}

function resetPassword(user) {
  alert(`已重置 ${user.nickname} 的密码为默认密码`)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-5">用户管理</h1>

    <!-- Search -->
    <div class="bg-white rounded-xl border border-slate-200 p-4 mb-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <input v-model="search.name" placeholder="用户名称" class="admin-input" />
        <input v-model="search.phone" placeholder="手机号码" class="admin-input" />
        <select v-model="search.status" class="admin-input">
          <option value="">全部状态</option>
          <option value="true">启用</option>
          <option value="false">停用</option>
        </select>
        <input v-model="search.startDate" type="date" class="admin-input" />
        <input v-model="search.endDate" type="date" class="admin-input" />
      </div>
      <div class="flex gap-2 mt-3">
        <button class="admin-btn-primary">搜索</button>
        <button class="admin-btn-outline">重置</button>
        <button class="admin-btn-outline ml-auto">
          <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          导出
        </button>
        <button class="admin-btn-outline">
          <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          导入
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
              <th class="text-left px-4 py-3 font-medium">用户编号</th>
              <th class="text-left px-4 py-3 font-medium">用户名</th>
              <th class="text-left px-4 py-3 font-medium">昵称</th>
              <th class="text-left px-4 py-3 font-medium">手机号</th>
              <th class="text-left px-4 py-3 font-medium">角色</th>
              <th class="text-left px-4 py-3 font-medium">状态</th>
              <th class="text-left px-4 py-3 font-medium">注册时间</th>
              <th class="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id"
              class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ user.uid }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ user.name }}</td>
              <td class="px-4 py-3 text-slate-600">{{ user.nickname }}</td>
              <td class="px-4 py-3 text-slate-600 font-mono text-xs">{{ user.phone }}</td>
              <td class="px-4 py-3">
                <span :class="[
                  'text-xs font-medium px-2 py-0.5 rounded-full',
                  user.role === '超级管理员' ? 'bg-indigo-100 text-indigo-700' :
                  user.role === '版主' ? 'bg-purple-100 text-purple-700' :
                  'bg-slate-100 text-slate-600',
                ]">{{ user.role }}</span>
              </td>
              <td class="px-4 py-3">
                <button @click="toggleStatus(user)"
                  :class="['relative w-10 h-5 rounded-full transition-colors cursor-pointer focus:outline-none', user.status ? 'bg-indigo-600' : 'bg-slate-300']">
                  <span :class="['absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', user.status ? 'translate-x-5' : 'translate-x-0']" />
                </button>
              </td>
              <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ user.createdAt }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2 whitespace-nowrap">
                  <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">修改</button>
                  <button @click="openRoleModal(user)" class="text-xs text-purple-600 hover:text-purple-800 cursor-pointer transition-colors">分配角色</button>
                  <button @click="resetPassword(user)" class="text-xs text-amber-600 hover:text-amber-800 cursor-pointer transition-colors">重置密码</button>
                  <button @click="deleteUser(user.id)" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>共 {{ users.length }} 条</span>
        <div class="flex items-center gap-1">
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs">上一页</button>
          <span class="w-8 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-xs">1</span>
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs">下一页</button>
        </div>
      </div>
    </div>

    <!-- Role Modal -->
    <Teleport to="body">
      <div v-if="showRoleModal" @click.self="showRoleModal = false"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-80 shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="font-semibold text-slate-800">分配角色</h3>
            <button @click="showRoleModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6">
            <p class="text-sm text-slate-500 mb-4">为 <span class="font-medium text-slate-800">{{ roleTarget?.nickname }}</span> 分配角色</p>
            <div class="space-y-2">
              <label v-for="role in roles" :key="role" class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors"
                :class="roleTarget?.role === role ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200'">
                <input type="radio" :value="role" v-model="roleTarget.role" class="accent-indigo-600 w-4 h-4" />
                <span class="text-sm text-slate-700">{{ role }}</span>
              </label>
            </div>
            <div class="flex gap-2 mt-5">
              <button @click="showRoleModal = false" class="flex-1 h-9 border border-slate-300 text-slate-600 text-sm rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">取消</button>
              <button @click="saveRole" class="flex-1 h-9 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 cursor-pointer transition-colors">确认</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.admin-input {
  @apply h-9 px-3 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition bg-white text-slate-700;
}
.admin-btn-primary {
  @apply inline-flex items-center h-8 px-4 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer;
}
.admin-btn-outline {
  @apply inline-flex items-center h-8 px-4 border border-slate-300 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition cursor-pointer;
}
</style>
