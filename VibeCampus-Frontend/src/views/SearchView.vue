<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserAvatar from '@/components/UserAvatar.vue'
import { useSocialStore } from '@/stores/social'

const route = useRoute()
const router = useRouter()
const socialStore = useSocialStore()

const keyword = ref(route.query.keyword || '')
const sortBy = ref('latest')

const allResults = computed(() => {
  const currentKeyword = keyword.value.trim()
  if (!currentKeyword) return socialStore.feedPosts
  return socialStore.feedPosts.filter(post => post.content.includes(currentKeyword))
})

const sortedResults = computed(() => {
  const arr = [...allResults.value]
  if (sortBy.value === 'likes') arr.sort((a, b) => b.likes - a.likes)
  else if (sortBy.value === 'comments') arr.sort((a, b) => b.comments - a.comments)
  return arr
})

function highlight(text) {
  if (!keyword.value) return text
  const re = new RegExp(`(${keyword.value})`, 'gi')
  return text.replace(re, '<mark class="bg-yellow-100 text-yellow-800 px-0.5">$1</mark>')
}

function doSearch() {
  if (keyword.value.trim()) {
    router.replace({ query: { keyword: keyword.value.trim() } })
  }
}

watch(() => route.query.keyword, v => { keyword.value = v || '' })

const categoryLabel = {
  social_find: '捞人',
  social_buddy: '找搭子',
  social_love: '恋爱',
  share: '分享墙',
  trade: '买卖墙',
  general: '综合墙',
}
</script>

<template>
  <div class="min-h-screen bg-[#F6F6F6]">
    <div class="max-w-[860px] mx-auto px-4 pt-5">
      <!-- Search bar -->
      <div class="flex gap-0 mb-5">
        <input
          v-model="keyword"
          @keydown.enter="doSearch"
          placeholder="搜索帖子内容..."
          class="flex-1 h-10 px-4 text-[14px] border border-[#EBEBEB] bg-white outline-none focus:border-[#1772F6] transition-colors"
        />
        <button @click="doSearch"
          class="w-20 h-10 bg-[#1772F6] text-white text-[13px] font-medium hover:bg-[#0d65e8] transition-colors cursor-pointer shrink-0">
          搜索
        </button>
      </div>

      <!-- Sort & meta -->
      <div class="flex items-center justify-between mb-3">
        <p class="text-[13px] text-[#8590A6]">
          共 <span class="text-[#1772F6] font-medium">{{ sortedResults.length }}</span> 条结果
          <span v-if="keyword" class="ml-1">关于「<span class="text-[#1A1A1A]">{{ keyword }}</span>」</span>
        </p>
        <div class="flex items-center gap-1 text-[13px]">
          <button
            v-for="s in [{ key: 'latest', label: '最新' }, { key: 'likes', label: '最多赞' }, { key: 'comments', label: '最多评论' }]"
            :key="s.key"
            @click="sortBy = s.key"
            :class="['px-3 py-1 cursor-pointer transition-colors', sortBy === s.key ? 'bg-[#1772F6] text-white' : 'bg-white border border-[#EBEBEB] text-[#444] hover:border-[#1772F6] hover:text-[#1772F6]']"
          >{{ s.label }}</button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="sortedResults.length === 0"
        class="bg-white border border-[#EBEBEB] py-16 flex flex-col items-center gap-3 text-[#8590A6]">
        <svg class="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <p class="text-[14px]">未找到相关内容</p>
      </div>

      <div v-else class="bg-white border border-[#EBEBEB]">
        <article
          v-for="post in sortedResults"
          :key="post.id"
          @click="$router.push(`/c/${post.id}`)"
          class="px-6 py-5 border-b border-[#EBEBEB] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
        >
          <div class="flex items-center gap-2 mb-2">
            <UserAvatar
              :user="post.author"
              :anonymous="post.anonymous"
              size-class="w-7 h-7"
              text-class="text-xs"
            />
            <span class="text-[13px] font-medium text-[#1A1A1A]">{{ post.anonymous ? '匿名用户' : post.author?.username }}</span>
            <span class="text-[11px] px-1.5 py-0.5 bg-[#E8F3FF] text-[#1772F6] border border-[#C7DEFF]">
              {{ categoryLabel[post.category] || '综合墙' }}
            </span>
            <span class="text-[12px] text-[#8590A6] ml-auto">{{ post.time }}</span>
          </div>
          <p class="text-[14px] text-[#1A1A1A] leading-relaxed line-clamp-3"
            v-html="highlight(post.content)" />
          <div class="flex items-center gap-4 mt-3 text-[12px] text-[#8590A6]">
            <span>赞同 {{ post.likes }}</span>
            <span>{{ post.comments }} 评论</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
