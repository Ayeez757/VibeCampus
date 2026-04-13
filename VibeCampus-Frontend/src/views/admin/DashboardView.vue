<script setup>
const stats = [
  { label: '\u603b\u7528\u6237\u6570', value: '3,842', change: '+128', up: true, color: 'indigo' },
  { label: '\u4eca\u65e5\u65b0\u5e16', value: '47', change: '+12', up: true, color: 'sky' },
  { label: '\u5f85\u5ba1\u6838\u5e16\u5b50', value: '8', change: '-3', up: false, color: 'amber' },
  { label: '\u4eca\u65e5\u8bc4\u8bba', value: '214', change: '+56', up: true, color: 'emerald' },
]

const recentPosts = [
  { id: 1, user: '\u5c0f\u660e', category: 'social_love', content: '\u56fe\u4e66\u9986\u4e09\u697c\u7684\u5b66\u59d0...', status: 'normal', time: '5\u5206\u949f\u524d' },
  { id: 2, user: '\u6570\u7801\u8fbe\u4eba', category: 'trade', content: '\u51fa\u4e8c\u624b MacBook Pro 2023...', status: 'normal', time: '23\u5206\u949f\u524d' },
  { id: 3, user: '\u533f\u540d\u7528\u6237', category: 'general', content: '\u6709\u65f6\u5019\u771f\u7684\u4e0d\u77e5\u9053...', status: 'pending', time: '1\u5c0f\u65f6\u524d' },
  { id: 4, user: '\u6444\u5f71\u7231\u597d\u8005', category: 'share', content: '\u4eca\u5929\u508d\u665a\u64cd\u573a...', status: 'normal', time: '2\u5c0f\u65f6\u524d' },
  { id: 5, user: '\u8003\u7814\u4eba', category: 'general', content: '\u8dea\u6c42\u5316\u5de5\u539f\u7406...', status: 'offline', time: '3\u5c0f\u65f6\u524d' },
]

const catLabel = { social_find: '\u635e\u4eba', social_buddy: '\u627e\u642d\u5b50', social_love: '\u604b\u7231', share: '\u5206\u4eab\u5899', trade: '\u4e70\u5356\u5899', general: '\u7efc\u5408\u5899' }
const statusLabel = { normal: '\u6b63\u5e38', pending: '\u5f85\u5ba1\u6838', offline: '\u4e0b\u67b6', rejected: '\u62d2\u7edd' }

const statusConfig = {
  normal: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  offline: 'bg-slate-100 text-slate-600',
  rejected: 'bg-red-100 text-red-600',
}

const colorMap = {
  indigo: 'bg-indigo-100 text-indigo-600',
  sky: 'bg-sky-100 text-sky-600',
  amber: 'bg-amber-100 text-amber-600',
  emerald: 'bg-emerald-100 text-emerald-600',
}

const pageTitle = '\u6570\u636e\u6982\u89c8'
const vsYesterday = '\u8f83\u6628\u65e5'
const recentTitle = '\u6700\u8fd1\u5e16\u5b50'
const viewAll = '\u67e5\u770b\u5168\u90e8'
const thUser = '\u7528\u6237'
const thPlate = '\u677f\u5757'
const thContent = '\u5185\u5bb9\u6458\u8981'
const thStatus = '\u72b6\u6001'
const thTime = '\u65f6\u95f4'
const thAction = '\u64cd\u4f5c'
const btnView = '\u67e5\u770b'
const btnOffline = '\u4e0b\u67b6'
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-6">{{ pageTitle }}</h1>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
        <div :class="['w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0', colorMap[stat.color]]">
          <svg v-if="stat.color === 'indigo'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <svg v-else-if="stat.color === 'sky'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <svg v-else-if="stat.color === 'amber'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
          <p class="text-xs text-slate-500 mt-0.5">{{ stat.label }}</p>
          <p :class="['text-xs font-medium mt-0.5', stat.up ? 'text-emerald-600' : 'text-slate-400']">
            {{ stat.change }} {{ vsYesterday }}
          </p>
        </div>
      </div>
    </div>

    <!-- Recent posts table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 class="font-medium text-slate-800 text-sm">{{ recentTitle }}</h2>
        <RouterLink to="/admin/content"
          class="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors">
          {{ viewAll }}
        </RouterLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs text-slate-500 uppercase">
              <th class="text-left px-5 py-3 font-medium">{{ thUser }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thPlate }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thContent }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thStatus }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thTime }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thAction }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in recentPosts" :key="post.id"
              class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-5 py-3 font-medium text-slate-800">{{ post.user }}</td>
              <td class="px-5 py-3 text-slate-600">{{ catLabel[post.category] }}</td>
              <td class="px-5 py-3 text-slate-600 max-w-xs truncate">{{ post.content }}</td>
              <td class="px-5 py-3">
                <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', statusConfig[post.status]]">
                  {{ statusLabel[post.status] }}
                </span>
              </td>
              <td class="px-5 py-3 text-slate-500 text-xs whitespace-nowrap">{{ post.time }}</td>
              <td class="px-5 py-3">
                <div class="flex items-center gap-2">
                  <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">{{ btnView }}</button>
                  <button class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">{{ btnOffline }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
