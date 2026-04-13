<script setup>
import { ref } from 'vue'

const search = ref({ word: '', category: '' })
const showAddModal = ref(false)
const newWord = ref({ word: '', category: 'ad', strategy: 'block' })

const categories = [
  { value: 'ad', label: '广告' },
  { value: 'porn', label: '色情' },
  { value: 'politics', label: '政治' },
  { value: 'violence', label: '暴力' },
  { value: 'other', label: '其他' },
]

const strategies = [
  { value: 'block', label: '直接拦截' },
  { value: 'review', label: '转为待审核' },
  { value: 'log', label: '仅记录' },
]

const strategyConfig = {
  block: 'bg-red-100 text-red-700',
  review: 'bg-amber-100 text-amber-700',
  log: 'bg-slate-100 text-slate-600',
}

const words = ref([
  { id: 1, word: '赌博', category: 'ad', strategy: 'block', hits: 24, createdAt: '2026-01-15' },
  { id: 2, word: '贷款', category: 'ad', strategy: 'block', hits: 67, createdAt: '2026-01-15' },
  { id: 3, word: '代写', category: 'ad', strategy: 'review', hits: 11, createdAt: '2026-02-01' },
  { id: 4, word: '刷单', category: 'ad', strategy: 'block', hits: 5, createdAt: '2026-02-20' },
  { id: 5, word: '约炮', category: 'porn', strategy: 'block', hits: 3, createdAt: '2026-03-01' },
])

function getCategoryLabel(v) {
  return categories.find(c => c.value === v)?.label || v
}

function getStrategyLabel(v) {
  return strategies.find(s => s.value === v)?.label || v
}

function deleteWord(id) {
  const idx = words.value.findIndex(w => w.id === id)
  if (idx !== -1) words.value.splice(idx, 1)
}

function addWord() {
  words.value.unshift({ id: Date.now(), ...newWord.value, hits: 0, createdAt: new Date().toLocaleDateString('zh') })
  showAddModal.value = false
  newWord.value = { word: '', category: 'ad', strategy: 'block' }
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-5">敏感词管理</h1>

    <!-- Search + actions -->
    <div class="bg-white rounded-xl border border-slate-200 p-4 mb-4">
      <div class="flex gap-3 flex-wrap">
        <input v-model="search.word" placeholder="搜索词语" class="admin-input w-48" />
        <select v-model="search.category" class="admin-input w-36">
          <option value="">全部分类</option>
          <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
        <button class="admin-btn-primary">搜索</button>
        <button class="admin-btn-outline">重置</button>
        <button @click="showAddModal = true" class="admin-btn-primary ml-auto">
          <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          添加敏感词
        </button>
        <button class="admin-btn-outline">批量导入(TXT)</button>
      </div>
    </div>

    <!-- Strategy notice -->
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
      <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p class="text-xs text-amber-700">
        命中策略说明：<strong>直接拦截</strong>—用户无法发布；<strong>转为待审核</strong>—需管理员审核后显示；<strong>仅记录</strong>—正常发布但记录日志。
      </p>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
              <th class="text-left px-5 py-3 font-medium">词语</th>
              <th class="text-left px-5 py-3 font-medium">分类</th>
              <th class="text-left px-5 py-3 font-medium">命中策略</th>
              <th class="text-left px-5 py-3 font-medium">命中次数</th>
              <th class="text-left px-5 py-3 font-medium">添加时间</th>
              <th class="text-left px-5 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="w in words" :key="w.id" class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-5 py-3 font-medium text-slate-800">{{ w.word }}</td>
              <td class="px-5 py-3 text-slate-600 text-xs">{{ getCategoryLabel(w.category) }}</td>
              <td class="px-5 py-3">
                <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', strategyConfig[w.strategy]]">
                  {{ getStrategyLabel(w.strategy) }}
                </span>
              </td>
              <td class="px-5 py-3 text-slate-600">{{ w.hits }}</td>
              <td class="px-5 py-3 text-slate-500 text-xs">{{ w.createdAt }}</td>
              <td class="px-5 py-3">
                <div class="flex items-center gap-2">
                  <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">修改</button>
                  <button @click="deleteWord(w.id)" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add modal -->
    <Teleport to="body">
      <div v-if="showAddModal" @click.self="showAddModal = false"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-96 shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="font-semibold text-slate-800">添加敏感词</h3>
            <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">词语</label>
              <input v-model="newWord.word" type="text" placeholder="输入敏感词"
                class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">分类</label>
              <select v-model="newWord.category"
                class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition">
                <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">命中策略</label>
              <select v-model="newWord.strategy"
                class="w-full h-10 px-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition">
                <option v-for="s in strategies" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>
            </div>
            <div class="flex gap-2 pt-1">
              <button @click="showAddModal = false" class="flex-1 h-9 border border-slate-300 text-slate-600 text-sm rounded-xl hover:bg-slate-50 cursor-pointer">取消</button>
              <button @click="addWord" class="flex-1 h-9 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 cursor-pointer">添加</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.admin-input { @apply h-9 px-3 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition bg-white text-slate-700; }
.admin-btn-primary { @apply inline-flex items-center h-8 px-4 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer; }
.admin-btn-outline { @apply inline-flex items-center h-8 px-4 border border-slate-300 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition cursor-pointer; }
</style>
