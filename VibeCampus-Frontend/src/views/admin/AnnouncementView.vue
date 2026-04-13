<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const editItem = ref(null)
const form = ref({ title: '', type: 'notice', status: 'draft', content: '', display: 'popup' })

const types = [
  { value: 'notice', label: '通知', class: 'bg-indigo-100 text-indigo-700' },
  { value: 'announcement', label: '公告', class: 'bg-sky-100 text-sky-700' },
  { value: 'warning', label: '警告', class: 'bg-red-100 text-red-700' },
]

const displayOptions = [
  { value: 'popup', label: '全局弹窗（登录后弹出一次）' },
  { value: 'marquee', label: '顶部跑马灯' },
  { value: 'message', label: '消息通知中心' },
]

const announcements = ref([
  { id: 1, title: '校园信息墙全新上线！', type: 'announcement', status: 'published', display: 'popup', content: '欢迎大家积极参与...', createdAt: '2026-04-01', author: '超级管理员' },
  { id: 2, title: '关于规范社区发帖的通知', type: 'notice', status: 'published', display: 'marquee', content: '请大家遵守社区规定...', createdAt: '2026-04-03', author: '超级管理员' },
  { id: 3, title: '五一假期系统维护公告', type: 'notice', status: 'draft', display: 'message', content: '五一期间将进行系统升级...', createdAt: '2026-04-07', author: '超级管理员' },
])

function getTypeConfig(v) {
  return types.find(t => t.value === v) || types[0]
}

function openNew() {
  editItem.value = null
  form.value = { title: '', type: 'notice', status: 'draft', content: '', display: 'popup' }
  showModal.value = true
}

function openEdit(item) {
  editItem.value = item
  form.value = { ...item }
  showModal.value = true
}

function save() {
  if (editItem.value) {
    Object.assign(editItem.value, form.value)
  } else {
    announcements.value.unshift({ id: Date.now(), ...form.value, createdAt: new Date().toLocaleDateString('zh'), author: '超级管理员' })
  }
  showModal.value = false
}

function deleteItem(id) {
  const idx = announcements.value.findIndex(a => a.id === id)
  if (idx !== -1) announcements.value.splice(idx, 1)
}

function togglePublish(item) {
  item.status = item.status === 'published' ? 'draft' : 'published'
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-semibold text-slate-800">公告管理</h1>
      <button @click="openNew" class="admin-btn-primary">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        发布公告
      </button>
    </div>

    <!-- List -->
    <div class="space-y-3">
      <div v-for="item in announcements" :key="item.id"
        class="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-200 transition-colors">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3 min-w-0">
            <span :class="['shrink-0 text-xs font-medium px-2 py-0.5 rounded-full mt-0.5', getTypeConfig(item.type).class]">
              {{ getTypeConfig(item.type).label }}
            </span>
            <div class="min-w-0">
              <h3 class="font-medium text-slate-800 truncate">{{ item.title }}</h3>
              <p class="text-sm text-slate-500 mt-0.5 line-clamp-1">{{ item.content }}</p>
              <div class="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span>{{ item.createdAt }}</span>
                <span>{{ item.author }}</span>
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  </svg>
                  {{ displayOptions.find(d => d.value === item.display)?.label }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span :class="[
              'text-xs font-medium px-2.5 py-1 rounded-full',
              item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600',
            ]">{{ item.status === 'published' ? '已发布' : '草稿' }}</span>
            <button @click="togglePublish(item)"
              class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">
              {{ item.status === 'published' ? '撤回' : '发布' }}
            </button>
            <button @click="openEdit(item)" class="text-xs text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">编辑</button>
            <button @click="deleteItem(item.id)" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" @click.self="showModal = false"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="font-semibold text-slate-800">{{ editItem ? '编辑公告' : '发布公告' }}</h3>
            <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">标题</label>
              <input v-model="form.title" type="text" placeholder="公告标题"
                class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">类型</label>
                <select v-model="form.type" class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition">
                  <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">状态</label>
                <select v-model="form.status" class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition">
                  <option value="draft">草稿</option>
                  <option value="published">发布</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">展示方式</label>
              <select v-model="form.display" class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 transition">
                <option v-for="d in displayOptions" :key="d.value" :value="d.value">{{ d.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">内容</label>
              <textarea v-model="form.content" rows="5" placeholder="公告内容（支持富文本，当前为文本模式）"
                class="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
            </div>
            <div class="flex gap-2 pt-1">
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
