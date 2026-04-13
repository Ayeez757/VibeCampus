<script setup>
import { ref } from 'vue'

const activeTab = ref('operation')

const operationLogs = ref([
  { id: 1, operator: 'admin', module: '内容管理', type: '删除', desc: '删除帖子ID:5（违规内容）', ip: '192.168.1.1', time: '2026-04-08 15:30:22', result: '成功' },
  { id: 2, operator: 'admin', module: '用户管理', type: '修改', desc: '停用用户U003账号', ip: '192.168.1.1', time: '2026-04-08 14:12:05', result: '成功' },
  { id: 3, operator: 'mod01', module: '评论管理', type: '删除', desc: '删除违规评论ID:15', ip: '192.168.1.5', time: '2026-04-08 13:45:18', result: '成功' },
  { id: 4, operator: 'admin', module: '敏感词管理', type: '新增', desc: '新增敏感词「约炮」', ip: '192.168.1.1', time: '2026-04-08 11:20:00', result: '成功' },
  { id: 5, operator: 'admin', module: '用户管理', type: '查询', desc: '导出用户列表', ip: '192.168.1.1', time: '2026-04-07 16:00:00', result: '成功' },
])

const loginLogs = ref([
  { id: 1, user: 'admin', ip: '192.168.1.1', browser: 'Chrome 123', loginAt: '2026-04-08 09:00:01', result: '成功' },
  { id: 2, user: 'mod01', ip: '10.0.0.5', browser: 'Firefox 124', loginAt: '2026-04-08 09:30:22', result: '成功' },
  { id: 3, user: 'unknown', ip: '180.100.45.67', browser: 'Python/requests', loginAt: '2026-04-08 10:15:33', result: '失败' },
  { id: 4, user: 'unknown', ip: '180.100.45.67', browser: 'Python/requests', loginAt: '2026-04-08 10:15:38', result: '失败' },
  { id: 5, user: 'admin', ip: '192.168.1.1', browser: 'Chrome 123', loginAt: '2026-04-07 08:55:44', result: '成功' },
])

const typeConfig = {
  '删除': 'bg-red-100 text-red-700',
  '修改': 'bg-amber-100 text-amber-700',
  '新增': 'bg-emerald-100 text-emerald-700',
  '查询': 'bg-slate-100 text-slate-600',
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-5">日志管理</h1>

    <!-- Tabs -->
    <div class="flex border-b border-slate-200 mb-5">
      <button v-for="t in ['operation', 'login']" :key="t"
        @click="activeTab = t"
        :class="[
          'px-5 h-10 text-sm font-medium border-b-2 transition-colors cursor-pointer',
          activeTab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800',
        ]">
        {{ t === 'operation' ? '操作日志' : '登录日志' }}
      </button>
    </div>

    <!-- Operation logs -->
    <div v-if="activeTab === 'operation'">
      <div class="flex gap-2 mb-3">
        <input placeholder="操作人" class="admin-input w-36" />
        <input placeholder="操作模块" class="admin-input w-36" />
        <input type="date" class="admin-input w-40" />
        <button class="admin-btn-primary">搜索</button>
        <button class="admin-btn-outline ml-auto">导出</button>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                <th class="text-left px-4 py-3 font-medium">操作人</th>
                <th class="text-left px-4 py-3 font-medium">模块</th>
                <th class="text-left px-4 py-3 font-medium">操作类型</th>
                <th class="text-left px-4 py-3 font-medium">操作描述</th>
                <th class="text-left px-4 py-3 font-medium">IP</th>
                <th class="text-left px-4 py-3 font-medium">操作时间</th>
                <th class="text-left px-4 py-3 font-medium">结果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in operationLogs" :key="log.id"
                class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="px-4 py-3 font-medium text-slate-800">{{ log.operator }}</td>
                <td class="px-4 py-3 text-slate-600 text-xs">{{ log.module }}</td>
                <td class="px-4 py-3">
                  <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', typeConfig[log.type] || 'bg-slate-100 text-slate-600']">
                    {{ log.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-600 text-xs max-w-xs truncate">{{ log.desc }}</td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ log.ip }}</td>
                <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ log.time }}</td>
                <td class="px-4 py-3">
                  <span class="text-xs font-medium text-emerald-600">{{ log.result }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Login logs -->
    <div v-if="activeTab === 'login'">
      <div class="flex gap-2 mb-3">
        <input placeholder="用户名" class="admin-input w-36" />
        <input placeholder="IP地址" class="admin-input w-40" />
        <input type="date" class="admin-input w-40" />
        <button class="admin-btn-primary">搜索</button>
        <button class="admin-btn-outline ml-auto">导出</button>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                <th class="text-left px-4 py-3 font-medium">用户名</th>
                <th class="text-left px-4 py-3 font-medium">IP地址</th>
                <th class="text-left px-4 py-3 font-medium">浏览器</th>
                <th class="text-left px-4 py-3 font-medium">登录时间</th>
                <th class="text-left px-4 py-3 font-medium">结果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in loginLogs" :key="log.id"
                :class="['border-t border-slate-100 hover:bg-slate-50 transition-colors', log.result === '失败' ? 'bg-red-50/30' : '']">
                <td class="px-4 py-3 font-medium text-slate-800">{{ log.user }}</td>
                <td class="px-4 py-3 font-mono text-xs text-slate-600">{{ log.ip }}</td>
                <td class="px-4 py-3 text-slate-500 text-xs">{{ log.browser }}</td>
                <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{{ log.loginAt }}</td>
                <td class="px-4 py-3">
                  <span :class="['text-xs font-medium', log.result === '成功' ? 'text-emerald-600' : 'text-red-600']">
                    {{ log.result }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
</style>
