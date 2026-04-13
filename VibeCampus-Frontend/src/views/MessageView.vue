<script setup>
import { ref, computed } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { useSocialStore } from '@/stores/social'

const socialStore = useSocialStore()

const tabs = [
  { key: 'notify', label: '互动通知' },
  { key: 'private', label: '私信' },
  { key: 'system', label: '系统通知' },
]

const activeTab = ref('notify')
const activeChatId = ref(null)

const notifications = ref([
  { id: 1, type: 'like', userId: 4, content: '赞同了你的帖子「整理了一份考研数学真题解析…」', time: '5分钟前', read: false },
  { id: 2, type: 'comment', userId: 5, content: '评论了你的帖子：「请问有没有专业课资料？」', time: '1小时前', read: false },
  { id: 3, type: 'reply', userId: 2, content: '回复了你的评论：「谢谢你的推荐！」', time: '3小时前', read: true },
])

const chats = ref([
  { id: 1, userId: 4, lastMsg: '已私信你了，注意查收~', time: '5分钟前', unread: 2 },
  { id: 2, userId: 5, lastMsg: '请问有资料吗？', time: '1天前', unread: 0 },
  { id: 3, userId: 2, lastMsg: '好的，谢谢！', time: '2天前', unread: 0 },
])

const messages = ref({
  1: [
    { id: 1, from: 'other', content: '你好！看到你分享的资料了，能发我一份吗？', time: '10:30' },
    { id: 2, from: 'me', content: '已私信你了，注意查收~', time: '10:32' },
    { id: 3, from: 'other', content: '收到了，太感谢你了！', time: '10:35' },
  ],
  2: [
    { id: 1, from: 'other', content: '你好，请问你有考研专业课资料吗？', time: '昨天 15:00' },
  ],
  3: [],
})

const newMsg = ref('')
const activeChat = computed(() => chats.value.find(c => c.id === activeChatId.value))
const currentUser = computed(() => socialStore.currentUser)

function sendMsg() {
  if (!newMsg.value.trim() || !activeChatId.value) return
  if (!messages.value[activeChatId.value]) messages.value[activeChatId.value] = []
  messages.value[activeChatId.value].push({
    id: Date.now(), from: 'me',
    content: newMsg.value.trim(),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  })
  newMsg.value = ''
}

const systemMsgs = ref([
  { id: 1, type: 'announcement', title: '平台公告', content: '6月20日凌晨2:00-4:00将进行系统维护，届时服务不可用，请提前安排。', time: '2025-06-18', read: false },
  { id: 2, type: 'warning', title: '内容警告', content: '您的帖子「宿舍室友问题」因包含不当内容已被系统提示，请注意发言规范。', time: '2025-06-15', read: true },
])

const typeIcon = { like: '👍', comment: '💬', reply: '↩' }

function getUser(userId) {
  return socialStore.findUserById(userId)
}
</script>

<template>
  <div class="min-h-screen bg-[#F6F6F6]">
    <div class="max-w-[900px] mx-auto px-4 py-5">
      <div class="bg-white border border-[#EBEBEB]">
        <!-- Tab bar -->
        <div class="flex border-b border-[#EBEBEB]">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key; activeChatId = null"
            :class="[
              'relative px-6 py-3.5 text-[14px] cursor-pointer transition-colors',
              activeTab === tab.key
                ? 'text-[#1772F6] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1772F6] after:content-[\'\']'
                : 'text-[#444] hover:text-[#1772F6]'
            ]"
          >{{ tab.label }}</button>
        </div>

        <!-- Notifications tab -->
        <div v-if="activeTab === 'notify'">
          <div v-if="notifications.length === 0" class="py-16 flex flex-col items-center gap-3 text-[#8590A6]">
            <p class="text-[14px]">暂无互动通知</p>
          </div>
          <div v-else>
            <div v-for="n in notifications" :key="n.id"
              :class="['flex items-start gap-3 px-6 py-4 border-b border-[#EBEBEB] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors', !n.read && 'bg-[#F0F7FF]']">
              <UserAvatar :user="getUser(n.userId)" size-class="w-9 h-9" text-class="text-xs" />
              <div class="flex-1 min-w-0">
                <p class="text-[13px] text-[#1A1A1A]">
                  <span class="font-medium">{{ getUser(n.userId)?.username }}</span>
                  {{ n.content }}
                </p>
                <p class="text-[12px] text-[#8590A6] mt-1">{{ n.time }}</p>
              </div>
              <div v-if="!n.read" class="w-2 h-2 bg-[#1772F6] mt-1.5 shrink-0" />
            </div>
          </div>
        </div>

        <!-- Private messages tab -->
        <div v-else-if="activeTab === 'private'" class="flex" style="height: 520px;">
          <!-- Chat list -->
          <div class="w-56 border-r border-[#EBEBEB] overflow-y-auto shrink-0">
            <div v-for="chat in chats" :key="chat.id"
              @click="activeChatId = chat.id"
              :class="['flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-[#EBEBEB] last:border-b-0 transition-colors', activeChatId === chat.id ? 'bg-[#E8F3FF]' : 'hover:bg-[#F6F6F6]']">
              <div class="relative shrink-0">
                <UserAvatar :user="getUser(chat.userId)" size-class="w-9 h-9" text-class="text-xs" />
                <div v-if="chat.unread" class="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5">
                  {{ chat.unread }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="text-[13px] font-medium text-[#1A1A1A]">{{ getUser(chat.userId)?.username }}</span>
                  <span class="text-[11px] text-[#8590A6] shrink-0">{{ chat.time }}</span>
                </div>
                <p class="text-[12px] text-[#8590A6] truncate mt-0.5">{{ chat.lastMsg }}</p>
              </div>
            </div>
          </div>

          <!-- Chat window -->
          <div v-if="activeChatId" class="flex-1 flex flex-col min-w-0">
            <div class="px-4 py-3 border-b border-[#EBEBEB] text-[14px] font-medium text-[#1A1A1A]">
              {{ getUser(activeChat?.userId)?.username }}
            </div>
            <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F7F8FA]">
              <div v-for="msg in messages[activeChatId]" :key="msg.id"
                :class="['flex gap-2.5', msg.from === 'me' ? 'justify-end' : 'justify-start']">
                <UserAvatar
                  v-if="msg.from !== 'me'"
                  :user="getUser(activeChat?.userId)"
                  size-class="w-8 h-8"
                  text-class="text-xs"
                />
                <div :class="['max-w-[65%]']">
                  <div :class="['px-3 py-2 text-[13px] text-[#1A1A1A]', msg.from === 'me' ? 'bg-[#1772F6] text-white' : 'bg-white border border-[#EBEBEB]']">
                    {{ msg.content }}
                  </div>
                  <p class="text-[11px] text-[#8590A6] mt-1" :class="msg.from === 'me' ? 'text-right' : ''">{{ msg.time }}</p>
                </div>
                <UserAvatar
                  v-if="msg.from === 'me'"
                  :user="currentUser"
                  :clickable="false"
                  size-class="w-8 h-8"
                  text-class="text-xs"
                />
              </div>
            </div>
            <div class="px-4 py-3 border-t border-[#EBEBEB] flex gap-2">
              <input v-model="newMsg" @keydown.enter="sendMsg" placeholder="输入消息…"
                class="flex-1 h-9 px-3 text-[13px] border border-[#EBEBEB] outline-none focus:border-[#1772F6] transition-colors" />
              <button @click="sendMsg" :disabled="!newMsg.trim()"
                class="px-5 h-9 bg-[#1772F6] text-white text-[13px] hover:bg-[#0d65e8] disabled:opacity-40 cursor-pointer transition-colors">
                发送
              </button>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-[#8590A6] text-[14px]">
            选择一个对话
          </div>
        </div>

        <!-- System messages tab -->
        <div v-else-if="activeTab === 'system'">
          <div v-if="systemMsgs.length === 0" class="py-16 flex flex-col items-center gap-3 text-[#8590A6]">
            <p class="text-[14px]">暂无系统通知</p>
          </div>
          <div v-else>
            <div v-for="msg in systemMsgs" :key="msg.id"
              :class="['px-6 py-4 border-b border-[#EBEBEB] last:border-b-0', !msg.read && 'bg-[#F0F7FF]']">
              <div class="flex items-start gap-3">
                <div :class="['w-8 h-8 flex items-center justify-center shrink-0 text-sm', msg.type === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-500' : 'bg-[#E8F3FF] border border-[#C7DEFF] text-[#1772F6]']">
                  {{ msg.type === 'warning' ? '⚠' : '📢' }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-[13px] font-semibold text-[#1A1A1A]">{{ msg.title }}</p>
                    <span class="text-[12px] text-[#8590A6]">{{ msg.time }}</span>
                  </div>
                  <p class="text-[13px] text-[#444] mt-1 leading-relaxed">{{ msg.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
