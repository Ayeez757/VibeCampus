<script setup>
import { ref } from 'vue'

const search = ref({ userId: '', postId: '', keyword: '' })
const selectedIds = ref([])

const comments = ref([
  { id: 1, parentId: null, userId: 'U001', user: '小红', postId: 4, content: '好美！感谢分享，我下次也要去拍！', createdAt: '2026-04-08 17:00' },
  { id: 2, parentId: null, userId: 'U002', user: '阿明', postId: 4, content: '第二张图构图超好，有没有用什么滤镜？', createdAt: '2026-04-08 16:45' },
  { id: 3, parentId: 2, userId: 'U004', user: '摄影爱好者', postId: 4, content: '@阿明 没有用滤镜，直出的，光线好', createdAt: '2026-04-08 16:50' },
  { id: 4, parentId: null, userId: 'U003', user: '匿名用户', postId: 3, content: '同感，有时候真的很迷茫', createdAt: '2026-04-08 15:30' },
  { id: 5, parentId: null, userId: 'U005', user: '考研人', postId: 5, content: '有人有吗，我也要！', createdAt: '2026-04-08 11:00' },
])

function toggleSelect(id) {
  const i = selectedIds.value.indexOf(id)
  if (i === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(i, 1)
}

function toggleAll(e) {
  selectedIds.value = e.target.checked ? comments.value.map(c => c.id) : []
}

function deleteComment(id) {
  const idx = comments.value.findIndex(c => c.id === id)
  if (idx !== -1) {
    const parentId = comments.value[idx].id
    comments.value.splice(idx, 1)
    // Remove children
    comments.value = comments.value.filter(c => c.parentId !== parentId)
  }
  selectedIds.value = selectedIds.value.filter(i => i !== id)
}

function batchDelete() {
  const ids = [...selectedIds.value]
  ids.forEach(id => deleteComment(id))
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-5">评论管理</h1>

    <!-- Search -->
    <div class="bg-white rounded-xl border border-slate-200 p-4 mb-4">
      <div class="grid grid-cols-3 gap-3">
        <input v-model="search.userId" placeholder="用户ID" class="admin-input" />
        <input v-model="search.postId" placeholder="帖子ID" class="admin-input" />
        <input v-model="search.keyword" placeholder="评论内容关键词" class="admin-input" />
      </div>
      <div class="flex gap-2 mt-3">
        <button class="admin-btn-primary">搜索</button>
        <button class="admin-btn-outline">重置</button>
        <button class="admin-btn-outline ml-auto">导出</button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 mb-3">
      <button @click="batchDelete" :disabled="selectedIds.length === 0"
        class="admin-btn-danger" :class="{ 'opacity-50 cursor-not-allowed': selectedIds.length === 0 }">
        批量删除 {{ selectedIds.length > 0 ? `(${selectedIds.length})` : '' }}
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
              <th class="px-4 py-3 w-10">
                <input type="checkbox" @change="toggleAll" class="accent-indigo-600 w-4 h-4 cursor-pointer" />
              </th>
              <th class="text-left px-4 py-3 font-medium">评论ID</th>
              <th class="text-left px-4 py-3 font-medium">上级评论ID</th>
              <th class="text-left px-4 py-3 font-medium">用户</th>
              <th class="text-left px-4 py-3 font-medium">帖子ID</th>
              <th class="text-left px-4 py-3 font-medium">评论内容</th>
              <th class="text-left px-4 py-3 font-medium">创建时间</th>
              <th class="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in comments" :key="c.id"
              :class="['border-t border-slate-100 hover:bg-slate-50 transition-colors', c.parentId ? 'bg-slate-50/40' : '']">
              <td class="px-4 py-3 text-center">
                <input type="checkbox" :checked="selectedIds.includes(c.id)" @change="toggleSelect(c.id)"
                  class="accent-indigo-600 w-4 h-4 cursor-pointer" />
              </td>
              <td class="px-4 py-3 font-mono text-xs text-slate-600">{{ c.id }}</td>
              <td class="px-4 py-3 font-mono text-xs text-slate-400">{{ c.parentId || '—' }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <span v-if="c.parentId" class="text-slate-300">↳</span>
                  <span class="font-medium text-slate-800">{{ c.user }}</span>
                  <span class="text-xs text-slate-400 font-mono">({{ c.userId }})</span>
                </div>
              </td>
              <td class="px-4 py-3 font-mono text-xs text-slate-600">{{ c.postId }}</td>
              <td class="px-4 py-3 text-slate-600 max-w-xs truncate">{{ c.content }}</td>
              <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ c.createdAt }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">修改</button>
                  <button @click="deleteComment(c.id)" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>共 {{ comments.length }} 条</span>
        <div class="flex items-center gap-1">
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs">上一页</button>
          <span class="w-8 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-xs">1</span>
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.admin-input { @apply h-9 px-3 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition bg-white text-slate-700; }
.admin-btn-primary { @apply inline-flex items-center h-8 px-4 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer; }
.admin-btn-outline { @apply inline-flex items-center h-8 px-4 border border-slate-300 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition cursor-pointer; }
.admin-btn-danger { @apply inline-flex items-center h-8 px-4 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition cursor-pointer; }
</style>
