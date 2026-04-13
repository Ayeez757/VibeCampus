<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const phone = ref('')
const smsCode = ref('')
const newPwd = ref('')
const confirmPwd = ref('')
const countdown = ref(0)
const loading = ref(false)
const error = ref('')

function startCountdown() {
  countdown.value = 60
  const t = setInterval(() => {
    if (--countdown.value <= 0) clearInterval(t)
  }, 1000)
}

async function sendSms() {
  if (!phone.value || !/^1\d{10}$/.test(phone.value)) {
    error.value = '请输入有效手机号'
    return
  }
  error.value = ''
  startCountdown()
}

async function next() {
  error.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  if (step.value === 1) {
    if (!phone.value) { error.value = '请输入手机号'; return }
    step.value = 2
  } else if (step.value === 2) {
    if (smsCode.value !== '123456') { error.value = '验证码错误（测试：123456）'; return }
    step.value = 3
  } else if (step.value === 3) {
    if (!newPwd.value || newPwd.value !== confirmPwd.value) { error.value = '两次密码不一致'; return }
    step.value = 4
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F6F6F6] flex items-center justify-center py-12">
    <div class="w-full max-w-[380px] mx-4">
      <div class="flex flex-col items-center mb-8">
        <div class="w-10 h-10 bg-[#1772F6] flex items-center justify-center mb-3">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-[20px] font-bold text-[#1A1A1A]">找回密码</h1>
      </div>

      <!-- Steps indicator -->
      <div class="flex items-center justify-center gap-0 mb-6">
        <template v-for="(label, i) in ['验证手机', '输入验证码', '重置密码']" :key="i">
          <div :class="['w-7 h-7 flex items-center justify-center text-[12px] font-bold',
            step > i + 1 ? 'bg-[#1772F6] text-white' :
            step === i + 1 ? 'bg-[#1772F6] text-white' : 'bg-[#EBEBEB] text-[#8590A6]']">
            {{ step > i + 1 ? '✓' : i + 1 }}
          </div>
          <div v-if="i < 2" :class="['w-12 h-0.5', step > i + 1 ? 'bg-[#1772F6]' : 'bg-[#EBEBEB]']" />
        </template>
      </div>

      <!-- Success -->
      <div v-if="step === 4" class="bg-white border border-[#EBEBEB] px-8 py-10 flex flex-col items-center gap-4">
        <div class="w-14 h-14 bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <svg class="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="text-[15px] font-semibold text-[#1A1A1A]">密码重置成功</p>
        <p class="text-[13px] text-[#8590A6]">请用新密码登录</p>
        <button @click="router.push('/userlogin')"
          class="w-full h-10 bg-[#1772F6] text-white font-medium text-[14px] hover:bg-[#0d65e8] transition-colors cursor-pointer mt-2">
          去登录
        </button>
      </div>

      <!-- Form steps -->
      <div v-else class="bg-white border border-[#EBEBEB]">
        <div class="px-8 py-8 space-y-4">
          <div v-if="error" class="text-[13px] text-red-500 bg-red-50 border border-red-100 px-3 py-2">
            {{ error }}
          </div>

          <!-- Step 1 -->
          <template v-if="step === 1">
            <div>
              <label class="block text-[13px] text-[#1A1A1A] mb-1.5">注册手机号</label>
              <input v-model="phone" type="tel" placeholder="请输入注册时的手机号"
                class="w-full h-10 px-3 text-[14px] border border-[#EBEBEB] bg-white outline-none focus:border-[#1772F6] transition-colors" />
            </div>
          </template>

          <!-- Step 2 -->
          <template v-else-if="step === 2">
            <p class="text-[13px] text-[#8590A6]">验证码已发送至 <span class="text-[#1A1A1A] font-medium">{{ phone }}</span></p>
            <div>
              <label class="block text-[13px] text-[#1A1A1A] mb-1.5">短信验证码</label>
              <div class="flex gap-2">
                <input v-model="smsCode" type="text" placeholder="6位验证码" maxlength="6"
                  class="flex-1 h-10 px-3 text-[14px] border border-[#EBEBEB] bg-white outline-none focus:border-[#1772F6] transition-colors tracking-widest" />
                <button @click="sendSms" :disabled="countdown > 0"
                  class="h-10 px-4 text-[13px] border border-[#EBEBEB] text-[#1772F6] hover:bg-[#E8F3FF] disabled:text-[#8590A6] disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0">
                  {{ countdown > 0 ? `${countdown}s` : '重新发送' }}
                </button>
              </div>
            </div>
          </template>

          <!-- Step 3 -->
          <template v-else-if="step === 3">
            <div>
              <label class="block text-[13px] text-[#1A1A1A] mb-1.5">新密码</label>
              <input v-model="newPwd" type="password" placeholder="至少8位"
                class="w-full h-10 px-3 text-[14px] border border-[#EBEBEB] bg-white outline-none focus:border-[#1772F6] transition-colors" />
            </div>
            <div>
              <label class="block text-[13px] text-[#1A1A1A] mb-1.5">确认新密码</label>
              <input v-model="confirmPwd" type="password" placeholder="再次输入新密码"
                class="w-full h-10 px-3 text-[14px] border border-[#EBEBEB] bg-white outline-none focus:border-[#1772F6] transition-colors" />
            </div>
          </template>

          <button @click="next" :disabled="loading"
            class="w-full h-10 bg-[#1772F6] text-white font-medium text-[14px] hover:bg-[#0d65e8] disabled:opacity-60 transition-colors cursor-pointer">
            {{ loading ? '处理中…' : step === 3 ? '重置密码' : '下一步' }}
          </button>
        </div>

        <div class="border-t border-[#EBEBEB] px-8 py-4 text-center text-[13px] text-[#8590A6]">
          <RouterLink to="/userlogin" class="text-[#1772F6] hover:underline">返回登录</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
