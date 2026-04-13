<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  user: { type: Object, default: null },
  anonymous: { type: Boolean, default: false },
  clickable: { type: Boolean, default: true },
  sizeClass: { type: String, default: 'w-10 h-10' },
  textClass: { type: String, default: 'text-sm' },
})

const router = useRouter()

const canNavigate = computed(() => props.clickable && props.user?.id && !props.anonymous)
const fallbackText = computed(() => {
  if (props.anonymous) return '匿'
  return props.user?.username?.slice(0, 1) || '?'
})

function handleClick(event) {
  if (!canNavigate.value) return
  event.stopPropagation()
  router.push({ name: 'public-user-profile', params: { id: props.user.id } })
}
</script>

<template>
  <component
    :is="canNavigate ? 'button' : 'div'"
    :type="canNavigate ? 'button' : undefined"
    :title="canNavigate ? `查看 ${user.username} 的个人中心` : '用户头像'"
    @click="handleClick"
    :class="[
      'overflow-hidden rounded-full shrink-0 flex items-center justify-center border border-[#EBEBEB]',
      sizeClass,
      canNavigate ? 'cursor-pointer hover:opacity-90 transition-opacity' : 'cursor-default',
      anonymous ? 'bg-[#F0F2F5] text-[#8590A6]' : 'bg-[#1772F6] text-white'
    ]"
  >
    <img
      v-if="!anonymous && user?.avatar"
      :src="user.avatar"
      :alt="`${user.username}头像`"
      class="w-full h-full object-cover"
    />
    <span v-else :class="['font-semibold leading-none', textClass]">{{ fallbackText }}</span>
  </component>
</template>
