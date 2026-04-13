<script setup>
import { useSocialStore } from '@/stores/social'

const socialStore = useSocialStore()
</script>

<template>
  <aside class="w-[280px] shrink-0">
    <!-- Hot Rank Block -->
    <div class="bg-white border border-[#EBEBEB]">
      <div class="flex items-center justify-between px-4 py-3 border-b border-[#EBEBEB]">
        <span class="font-semibold text-[14px] text-[#1A1A1A]">热门内容</span>
        <span class="text-[12px] text-[#8590A6] cursor-pointer hover:text-[#1772F6]">查看更多</span>
      </div>
      <ul>
        <li
          v-for="(post, i) in socialStore.hotPosts"
          :key="post.id"
          @click="$router.push(`/c/${post.id}`)"
          class="flex items-start gap-3 px-4 py-3 border-b border-[#F0F0F0] last:border-b-0 cursor-pointer hover:bg-[#F7F8FA] transition-colors group"
        >
          <span
            :class="[
              'shrink-0 w-5 h-5 flex items-center justify-center text-[12px] font-bold mt-0.5',
              i === 0 ? 'bg-[#FF6600] text-white' :
              i === 1 ? 'bg-[#FF9900] text-white' :
              i === 2 ? 'bg-[#FFB800] text-white' :
              'bg-transparent text-[#8590A6]'
            ]"
          >{{ i + 1 }}</span>
          <span class="flex-1 text-[13px] text-[#444] line-clamp-2 leading-[1.5] group-hover:text-[#1772F6] transition-colors">
            {{ post.title }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Quick post prompt -->
    <div class="mt-3 bg-white border border-[#EBEBEB] px-4 py-4">
      <p class="text-[13px] text-[#8590A6] mb-3 leading-relaxed">发布你的校园动态，分享或求助都可以！</p>
      <RouterLink to="/post/create"
        class="block w-full text-center py-2 bg-[#1772F6] text-white text-[13px] font-medium hover:bg-[#0d65e8] transition-colors cursor-pointer">
        立即发布
      </RouterLink>
    </div>
  </aside>
</template>
