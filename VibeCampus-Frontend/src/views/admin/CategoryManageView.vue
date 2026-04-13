<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name: '\u6700\u65b0',
    slug: 'latest',
    icon: 'star',
    order: 1,
    status: true,
    builtin: true,
    desc: '\u9996\u9875\u5c55\u793a\u6700\u65b0\u5e16\u5b50',
    createdAt: '2026-01-01',
    children: [],
  },
  {
    id: 2,
    name: '\u793e\u4ea4\u5899',
    slug: 'social',
    icon: 'users',
    order: 2,
    status: true,
    builtin: true,
    desc: '\u635e\u4eba\u3001\u627e\u642d\u5b50\u3001\u604b\u7231',
    createdAt: '2026-01-01',
    children: [
      {
        id: 21,
        name: '\u635e\u4eba',
        slug: 'social_find',
        icon: '',
        order: 1,
        status: true,
        builtin: true,
        desc: '\u5bfb\u4eba\u3001\u635e\u4eba\u76f8\u5173',
        createdAt: '2026-02-01',
        children: [],
      },
      {
        id: 22,
        name: '\u627e\u642d\u5b50',
        slug: 'social_buddy',
        icon: '',
        order: 2,
        status: true,
        builtin: true,
        desc: '\u8fd0\u52a8\u3001\u5b66\u4e60\u7b49\u642d\u5b50',
        createdAt: '2026-02-01',
        children: [],
      },
      {
        id: 23,
        name: '\u604b\u7231',
        slug: 'social_love',
        icon: '',
        order: 3,
        status: true,
        builtin: true,
        desc: '\u8868\u767d\u3001\u4ea4\u53cb',
        createdAt: '2026-02-01',
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: '\u5206\u4eab\u5899',
    slug: 'share',
    icon: 'share',
    order: 3,
    status: true,
    builtin: true,
    desc: '\u5206\u4eab\u751f\u6d3b\u4e0e\u5b66\u4e60',
    createdAt: '2026-01-01',
    children: [],
  },
  {
    id: 4,
    name: '\u4e70\u5356\u5899',
    slug: 'trade',
    icon: 'cart',
    order: 4,
    status: true,
    builtin: true,
    desc: '\u6821\u5185\u4e8c\u624b\u4ea4\u6613',
    createdAt: '2026-01-01',
    children: [],
  },
  {
    id: 5,
    name: '\u7efc\u5408\u5899',
    slug: 'general',
    icon: 'grid',
    order: 5,
    status: true,
    builtin: false,
    desc: '\u5176\u4ed6\u7efc\u5408\u5185\u5bb9',
    createdAt: '2026-01-01',
    children: [],
  },
])

const expandedIds = ref([2])

const pageTitle = '\u677f\u5757\u7ba1\u7406'
const btnNew = '\u65b0\u5efa\u677f\u5757'
const thName = '\u540d\u79f0'
const thSlug = '\u6807\u8bc6 (slug)'
const thOrder = '\u6392\u5e8f'
const thType = '\u7c7b\u578b'
const thDesc = '\u63cf\u8ff0'
const thEnable = '\u542f\u7528'
const thCreated = '\u521b\u5efa\u65f6\u95f4'
const thAction = '\u64cd\u4f5c'
const tagBuiltin = '\u5185\u7f6e'
const tagCustom = '\u81ea\u5b9a\u4e49'
const tagChild = '\u5b50\u5206\u7c7b'
const btnEdit = '\u7f16\u8f91'
const btnMove = '\u4e0a\u79fb/\u4e0b\u79fb'
const btnDelete = '\u5220\u9664'
const btnDeleteDisabled = '\u5185\u7f6e\u4e0d\u53ef\u5220'

function toggleExpand(id) {
  const idx = expandedIds.value.indexOf(id)
  if (idx === -1) expandedIds.value.push(id)
  else expandedIds.value.splice(idx, 1)
}

function toggleStatus(cat) {
  cat.status = !cat.status
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-semibold text-slate-800">{{ pageTitle }}</h1>
      <button class="admin-btn-primary">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {{ btnNew }}
      </button>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
              <th class="text-left px-5 py-3 font-medium">{{ thName }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thSlug }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thOrder }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thType }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thDesc }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thEnable }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thCreated }}</th>
              <th class="text-left px-5 py-3 font-medium">{{ thAction }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="cat in categories" :key="cat.id">
              <!-- Parent row -->
              <tr class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="px-5 py-3">
                  <div class="flex items-center gap-2">
                    <button v-if="cat.children.length" @click="toggleExpand(cat.id)"
                      class="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                      <svg class="w-3.5 h-3.5 transition-transform" :class="expandedIds.includes(cat.id) ? 'rotate-90' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                    <span v-else class="w-5" />
                    <span class="font-medium text-slate-800">{{ cat.name }}</span>
                  </div>
                </td>
                <td class="px-5 py-3 font-mono text-xs text-slate-500">{{ cat.slug }}</td>
                <td class="px-5 py-3 text-slate-600">{{ cat.order }}</td>
                <td class="px-5 py-3">
                  <span :class="cat.builtin ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'"
                    class="text-xs font-medium px-2 py-0.5 rounded-full">
                    {{ cat.builtin ? tagBuiltin : tagCustom }}
                  </span>
                </td>
                <td class="px-5 py-3 text-slate-500 text-xs max-w-xs truncate">{{ cat.desc }}</td>
                <td class="px-5 py-3">
                  <button @click="toggleStatus(cat)"
                    :class="['relative w-10 h-5 rounded-full transition-colors cursor-pointer focus:outline-none', cat.status ? 'bg-indigo-600' : 'bg-slate-300']">
                    <span :class="['absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', cat.status ? 'translate-x-5' : 'translate-x-0']" />
                  </button>
                </td>
                <td class="px-5 py-3 text-slate-500 text-xs">{{ cat.createdAt }}</td>
                <td class="px-5 py-3">
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">{{ btnEdit }}</button>
                    <button class="text-xs text-emerald-600 hover:text-emerald-800 cursor-pointer transition-colors">{{ btnMove }}</button>
                    <button v-if="!cat.builtin" class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">{{ btnDelete }}</button>
                    <span v-else class="text-xs text-slate-300 cursor-not-allowed">{{ btnDeleteDisabled }}</span>
                  </div>
                </td>
              </tr>
              <!-- Children rows -->
              <template v-if="cat.children.length && expandedIds.includes(cat.id)">
                <tr v-for="child in cat.children" :key="child.id"
                  class="border-t border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td class="px-5 py-2.5">
                    <div class="flex items-center gap-2 pl-7">
                      <div class="w-3 h-3 border-l border-b border-slate-300 rounded-bl" />
                      <span class="text-slate-700">{{ child.name }}</span>
                    </div>
                  </td>
                  <td class="px-5 py-2.5 font-mono text-xs text-slate-500">{{ child.slug }}</td>
                  <td class="px-5 py-2.5 text-slate-600 text-xs">{{ child.order }}</td>
                  <td class="px-5 py-2.5">
                    <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{{ tagChild }}</span>
                  </td>
                  <td class="px-5 py-2.5 text-slate-500 text-xs">{{ child.desc }}</td>
                  <td class="px-5 py-2.5">
                    <button @click="toggleStatus(child)"
                      :class="['relative w-10 h-5 rounded-full transition-colors cursor-pointer', child.status ? 'bg-indigo-600' : 'bg-slate-300']">
                      <span :class="['absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', child.status ? 'translate-x-5' : 'translate-x-0']" />
                    </button>
                  </td>
                  <td class="px-5 py-2.5 text-slate-500 text-xs">{{ child.createdAt }}</td>
                  <td class="px-5 py-2.5">
                    <div class="flex items-center gap-2 whitespace-nowrap">
                      <button class="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors">{{ btnEdit }}</button>
                      <button class="text-xs text-red-500 hover:text-red-700 cursor-pointer transition-colors">{{ btnDelete }}</button>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.admin-btn-primary {
  @apply inline-flex items-center h-8 px-4 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer;
}
</style>
