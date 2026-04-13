<script setup>
import { ref } from 'vue'

const roles = ref([
  {
    id: 1, name: '超级管理员', code: 'super_admin', builtin: true, userCount: 1,
    desc: '拥有所有权限，无法删除', createdAt: '2026-01-01',
    permissions: ['内容管理', '用户管理', '类别管理', '评论管理', '角色管理', '日志管理', '敏感词管理', '公告管理'],
  },
  {
    id: 2, name: '版主', code: 'moderator', builtin: true, userCount: 3,
    desc: '可审核内容和评论', createdAt: '2026-01-01',
    permissions: ['内容管理', '评论管理'],
  },
  {
    id: 3, name: '普通管理员', code: 'admin', builtin: false, userCount: 5,
    desc: '可管理用户', createdAt: '2026-02-01',
    permissions: ['用户管理'],
  },
])

const allPermissions = ['内容管理', '用户管理', '类别管理', '评论管理', '角色管理', '日志管理', '敏感词管理', '公告管理']
const expandedRoles = ref([])
const showModal = ref(false)
const editRole = ref(null)
const form = ref({ name: '', code: '', desc: '', permissions: [] })

function toggleExpand(id) {
  const i = expandedRoles.value.indexOf(id)
  if (i === -1) expandedRoles.value.push(id)
  else expandedRoles.value.splice(i, 1)
}

function openEdit(role) {
  editRole.value = role
  form.value = { name: role.name, code: role.code, desc: role.desc, permissions: [...role.permissions] }
  showModal.value = true
}

function save() {
  if (editRole.value) {
    Object.assign(editRole.value, form.value)
  }
  showModal.value = false
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-semibold text-slate-800">角色管理</h1>
      <button @click="showModal = true; editRole = null; form = { name: '', code: '', desc: '', permissions: [] }"
        class="admin-btn-primary">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        新增角色
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="role in roles" :key="role.id"
        class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
          @click="toggleExpand(role.id)">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="font-medium text-slate-800">{{ role.name }}</span>
              <span class="font-mono text-xs text-slate-400">{{ role.code }}</span>
              <span v-if="role.builtin" class="text-xs font-medium px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded">内置</span>
            </div>
            <p class="text-xs text-slate-500">{{ role.desc }} · {{ role.userCount }} 名用户</p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <button @click.stop="openEdit(role)" class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">编辑权限</button>
            <button v-if="!role.builtin" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">删除</button>
            <svg class="w-4 h-4 text-slate-400 transition-transform"
              :class="expandedRoles.includes(role.id) ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        <div v-if="expandedRoles.includes(role.id)" class="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
          <p class="text-xs text-slate-500 mb-2 font-medium">已分配权限：</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="p in role.permissions" :key="p"
              class="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700">
              {{ p }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit modal -->
    <Teleport to="body">
      <div v-if="showModal" @click.self="showModal = false"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="font-semibold text-slate-800">{{ editRole ? '编辑角色' : '新增角色' }}</h3>
            <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">角色名称</label>
                <input v-model="form.name" class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">角色标识</label>
                <input v-model="form.code" class="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">描述</label>
              <input v-model="form.desc" class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">权限分配</label>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="perm in allPermissions" :key="perm"
                  class="flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer hover:bg-slate-50 transition-colors"
                  :class="form.permissions.includes(perm) ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200'">
                  <input type="checkbox" :value="perm" v-model="form.permissions" class="accent-indigo-600 w-4 h-4" />
                  <span class="text-sm text-slate-700">{{ perm }}</span>
                </label>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="showModal = false" class="flex-1 h-9 border border-slate-300 text-slate-600 text-sm rounded-xl hover:bg-slate-50 cursor-pointer">取消</button>
              <button @click="save" class="flex-1 h-9 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 cursor-pointer">保存</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.admin-btn-primary { @apply inline-flex items-center h-8 px-4 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer; }
</style>
