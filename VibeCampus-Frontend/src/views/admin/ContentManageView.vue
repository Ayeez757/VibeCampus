<script setup>
import { ref, computed } from 'vue'

const search = ref({ userId: '', category: '', keyword: '', status: '', type: '', anonymous: '' })
const selectedIds = ref([])
const showDetailModal = ref(false)
const detailPost = ref(null)

const posts = ref([
  { id: 1, user: '\u5c0f\u660e', userId: 'U001', category: 'social_love', content: '\u56fe\u4e66\u9986\u4e09\u697c\u9760\u7a97\u7684\u4f4d\u7f6e\uff0c\u6709\u4e2a\u7a7f\u767d\u8272\u536b\u8863\u7684\u5973\u751f\uff0c\u4f60\u597d\u6f02\u4eae\uff0c\u80fd\u8ba4\u8bc6\u5417\uff1f', status: 'normal', type: 'text', anonymous: false, time: '2026-04-08 16:23' },
  { id: 2, user: '\u6570\u7801\u8fbe\u4eba', userId: 'U002', category: 'trade', content: '\u51fa\u4e8c\u624b MacBook Pro 2023\u6b3e M2 Pro 16G+512G\uff0c99\u65b0\uff0c\u81ea\u7528\u4e00\u5e74\u3002', status: 'normal', type: 'image', anonymous: false, time: '2026-04-08 15:45' },
  { id: 3, user: '\u533f\u540d\u7528\u6237', userId: 'U003', category: 'general', content: '\u6709\u65f6\u5019\u771f\u7684\u4e0d\u77e5\u9053\u8bfb\u4e66\u662f\u4e3a\u4e86\u4ec0\u4e48\u3002', status: 'normal', type: 'text', anonymous: true, time: '2026-04-08 14:30' },
  { id: 4, user: '\u6444\u5f71\u7231\u597d\u8005', userId: 'U004', category: 'share', content: '\u4eca\u5929\u508d\u665a\u64cd\u573a\u5915\u9633\u592a\u7f8e\u4e86\u3002', status: 'normal', type: 'image', anonymous: false, time: '2026-04-08 13:00' },
  { id: 5, user: '\u8003\u7814\u4eba', userId: 'U005', category: 'general', content: '\u8dea\u6c42\u5316\u5de5\u539f\u7406\u671f\u672b\u771f\u9898\uff01\uff01\uff01', status: 'offline', type: 'text', anonymous: false, time: '2026-04-08 10:22' },
  { id: 6, user: '\u661f\u661f', userId: 'U006', category: 'social_love', content: '\u54118\u680b402\u7684\u7537\u751f\u544a\u767d', status: 'normal', type: 'text', anonymous: true, time: '2026-04-07 22:00' },
])

const statusOptions = ['all', 'normal', 'offline', 'rejected']
const categoryOptions = ['all', 'latest', 'social_find', 'social_buddy', 'social_love', 'share', 'trade', 'general']
const categoryLabel = { all: '\u5168\u90e8', latest: '\u6700\u65b0\u5899', social_find: '\u635e\u4eba', social_buddy: '\u627e\u642d\u5b50', social_love: '\u604b\u7231', share: '\u5206\u4eab\u5899', trade: '\u4e70\u5356\u5899', general: '\u7efc\u5408\u5899' }
const typeOptions = ['all', 'text', 'image', 'video']
const typeLabel = { all: '\u5168\u90e8', text: '\u6587\u5b57', image: '\u56fe\u7247', video: '\u89c6\u9891' }
const statusLabel = { all: '\u5168\u90e8', normal: '\u6b63\u5e38', offline: '\u4e0b\u67b6', rejected: '\u62d2\u7edd' }

const statusConfig = {
  normal: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  offline: 'bg-slate-100 text-slate-600',
  rejected: 'bg-red-100 text-red-600',
}

function changeStatus(post, status) {
  post.status = status
}

function deletePost(id) {
  const idx = posts.value.findIndex(p => p.id === id)
  if (idx !== -1) posts.value.splice(idx, 1)
  selectedIds.value = selectedIds.value.filter(i => i !== id)
}

function batchDelete() {
  posts.value = posts.value.filter(p => !selectedIds.value.includes(p.id))
  selectedIds.value = []
}

function toggleSelect(id) {
  const i = selectedIds.value.indexOf(id)
  if (i === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(i, 1)
}

function toggleAll(e) {
  selectedIds.value = e.target.checked ? posts.value.map(p => p.id) : []
}

function openDetail(post) {
  detailPost.value = post
  showDetailModal.value = true
}

function resetSearch() {
  search.value = { userId: '', category: '', keyword: '', status: '', type: '', anonymous: '' }
}

const pageTitle = '\u5185\u5bb9\u7ba1\u7406'
const phUserId = '\u7528\u6237 ID'
const optAllCategory = '\u5168\u90e8\u677f\u5757'
const phKeyword = '\u5173\u952e\u8bcd\u641c\u7d22'
const optAllStatus = '\u5168\u90e8\u72b6\u6001'
const optAllType = '\u5168\u90e8\u7c7b\u578b'
const optAllAnon = '\u662f\u5426\u533f\u540d'
const optAnonYes = '\u533f\u540d'
const optAnonNo = '\u5b9e\u540d'
const btnSearch = '\u67e5\u8be2'
const btnReset = '\u91cd\u7f6e'
const btnPublish = '\u53d1\u5e03\u5e16\u5b50'
const btnBatchDelete = '\u6279\u91cf\u5220\u9664\u9009\u4e2d'
const thUser = '\u7528\u6237'
const thCategory = '\u677f\u5757'
const thContent = '\u5185\u5bb9\u6458\u8981'
const thType = '\u7c7b\u578b'
const thAnon = '\u533f\u540d'
const thStatus = '\u72b6\u6001'
const thTime = '\u53d1\u5e03\u65f6\u95f4'
const thAction = '\u64cd\u4f5c'
const anonYes = '\u662f'
const anonNo = '\u5426'
const btnDetail = '\u67e5\u770b'
const btnEdit = '\u7f16\u8f91'
const btnDel = '\u5220\u9664'
const pagerPrefix = '\u5171'
const pagerSuffix = '\u6761'
const btnPrev = '\u4e0a\u4e00\u9875'
const btnNext = '\u4e0b\u4e00\u9875'
const modalTitle = '\u5e16\u5b50\u8be6\u60c5'
const labelUser = '\u7528\u6237'
const labelCategory = '\u677f\u5757'
const labelStatus = '\u72b6\u6001'
const labelAnon = '\u533f\u540d'
const labelTime = '\u53d1\u5e03\u65f6\u95f4'
const labelBody = '\u6b63\u6587'
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-5">{{ pageTitle }}</h1>

    <!-- Search filters -->
    <div class="bg-white rounded-xl border border-slate-200 p-4 mb-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <input v-model="search.userId" :placeholder="phUserId" class="admin-input" />
        <select v-model="search.category" class="admin-input">
          <option value="">{{ optAllCategory }}</option>
          <option v-for="c in categoryOptions.slice(1)" :key="c" :value="c">{{ categoryLabel[c] }}</option>
        </select>
        <input v-model="search.keyword" :placeholder="phKeyword" class="admin-input" />
        <select v-model="search.status" class="admin-input">
          <option value="">{{ optAllStatus }}</option>
          <option v-for="s in statusOptions.slice(1)" :key="s" :value="s">{{ statusLabel[s] }}</option>
        </select>
        <select v-model="search.type" class="admin-input">
          <option value="">{{ optAllType }}</option>
          <option v-for="t in typeOptions.slice(1)" :key="t" :value="t">{{ typeLabel[t] }}</option>
        </select>
        <select v-model="search.anonymous" class="admin-input">
          <option value="">{{ optAllAnon }}</option>
          <option value="true">{{ optAnonYes }}</option>
          <option value="false">{{ optAnonNo }}</option>
        </select>
      </div>
      <div class="flex gap-2 mt-3">
        <button class="admin-btn-primary">{{ btnSearch }}</button>
        <button @click="resetSearch" class="admin-btn-outline">{{ btnReset }}</button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 mb-3">
      <button class="admin-btn-primary">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {{ btnPublish }}
      </button>
      <button @click="batchDelete" :disabled="selectedIds.length === 0" class="admin-btn-danger" :class="{ 'opacity-50 cursor-not-allowed': selectedIds.length === 0 }">
        {{ btnBatchDelete }}{{ selectedIds.length > 0 ? ` (${selectedIds.length})` : '' }}
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
              <th class="text-left px-4 py-3 font-medium">{{ thUser }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thCategory }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thContent }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thType }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thAnon }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thStatus }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thTime }}</th>
              <th class="text-left px-4 py-3 font-medium">{{ thAction }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id"
              class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-4 py-3 text-center">
                <input type="checkbox" :checked="selectedIds.includes(post.id)" @change="toggleSelect(post.id)"
                  class="accent-indigo-600 w-4 h-4 cursor-pointer" />
              </td>
              <td class="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{{ post.user }}</td>
              <td class="px-4 py-3 text-slate-600 whitespace-nowrap">{{ categoryLabel[post.category] || post.category }}</td>
              <td class="px-4 py-3 text-slate-600 max-w-xs truncate">{{ post.content }}</td>
              <td class="px-4 py-3 text-slate-600 whitespace-nowrap">{{ typeLabel[post.type] || post.type }}</td>
              <td class="px-4 py-3">
                <span :class="post.anonymous ? 'text-indigo-600' : 'text-slate-400'" class="text-xs">
                  {{ post.anonymous ? anonYes : anonNo }}
                </span>
              </td>
              <td class="px-4 py-3">
                <select :value="post.status" @change="changeStatus(post, $event.target.value)"
                  :class="['text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-300', statusConfig[post.status] || 'bg-slate-100 text-slate-600']">
                  <option v-for="s in statusOptions.slice(1)" :key="s" :value="s">{{ statusLabel[s] }}</option>
                </select>
              </td>
              <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ post.time }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2 whitespace-nowrap">
                  <button @click="openDetail(post)" class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">{{ btnDetail }}</button>
                  <button class="text-xs text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">{{ btnEdit }}</button>
                  <button @click="deletePost(post.id)" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">{{ btnDel }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>{{ pagerPrefix }} {{ posts.length }} {{ pagerSuffix }}</span>
        <div class="flex items-center gap-1">
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">{{ btnPrev }}</button>
          <span class="w-8 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-xs">1</span>
          <button class="px-3 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">{{ btnNext }}</button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div v-if="showDetailModal" @click.self="showDetailModal = false"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="font-semibold text-slate-800">{{ modalTitle }}</h3>
            <button @click="showDetailModal = false" class="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-if="detailPost" class="p-6 space-y-3 text-sm">
            <div class="flex gap-3">
              <span class="text-slate-500 w-20 shrink-0">{{ labelUser }}</span>
              <span class="text-slate-800 font-medium">{{ detailPost.user }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-slate-500 w-20 shrink-0">{{ labelCategory }}</span>
              <span class="text-slate-800">{{ categoryLabel[detailPost.category] || detailPost.category }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-slate-500 w-20 shrink-0">{{ labelStatus }}</span>
              <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', statusConfig[detailPost.status]]">{{ statusLabel[detailPost.status] || detailPost.status }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-slate-500 w-20 shrink-0">{{ labelAnon }}</span>
              <span class="text-slate-800">{{ detailPost.anonymous ? anonYes : anonNo }}</span>
            </div>
            <div class="flex gap-3">
              <span class="text-slate-500 w-20 shrink-0">{{ labelTime }}</span>
              <span class="text-slate-800">{{ detailPost.time }}</span>
            </div>
            <div>
              <p class="text-slate-500 mb-2">{{ labelBody }}</p>
              <p class="text-slate-800 bg-slate-50 rounded-lg p-3 leading-relaxed">{{ detailPost.content }}</p>
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
.admin-btn-danger {
  @apply inline-flex items-center h-8 px-4 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-100 transition cursor-pointer;
}
</style>
