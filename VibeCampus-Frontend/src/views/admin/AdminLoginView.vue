<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const rememberMe = ref(false)
const form = ref({ account: '', password: '', captcha: '' })

// 随机数学验证码
const num1 = ref(Math.floor(1 + Math.random() * 9))
const num2 = ref(Math.floor(1 + Math.random() * 9))
function refreshCaptcha() {
  num1.value = Math.floor(1 + Math.random() * 9)
  num2.value = Math.floor(1 + Math.random() * 9)
}

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  loading.value = false
  router.push('/admin')
}
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div class="absolute inset-0 opacity-20"
        style="background-image: radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%);" />
    </div>

    <!-- Login card -->
    <div class="relative w-full max-w-md mx-4">
      <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex w-12 h-12 bg-indigo-600 rounded-xl items-center justify-center mb-4 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
            </svg>
          </div>
          <h1 class="text-xl font-bold text-white">校园信息墙</h1>
          <p class="text-indigo-300 text-sm mt-1">后台管理系统</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Account -->
          <div>
            <label class="block text-sm font-medium text-indigo-200 mb-1.5">管理员账号</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </span>
              <input v-model="form.account" type="text" placeholder="请输入管理员账号"
                class="w-full h-11 pl-10 pr-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-indigo-300/60 outline-none focus:border-indigo-400 focus:bg-white/15 transition" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-indigo-200 mb-1.5">密码</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input v-model="form.password" type="password" placeholder="请输入密码"
                class="w-full h-11 pl-10 pr-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-indigo-300/60 outline-none focus:border-indigo-400 focus:bg-white/15 transition" />
            </div>
          </div>

          <!-- Captcha (math) -->
          <div>
            <label class="block text-sm font-medium text-indigo-200 mb-1.5">验证码</label>
            <div class="flex gap-2">
              <input v-model="form.captcha" type="text" placeholder="计算结果" maxlength="3"
                class="flex-1 h-11 px-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-indigo-300/60 outline-none focus:border-indigo-400 focus:bg-white/15 transition" />
              <button type="button" @click="refreshCaptcha"
                class="shrink-0 h-11 px-4 bg-indigo-600/80 border border-indigo-500/50 rounded-xl text-white font-mono text-sm font-bold cursor-pointer hover:bg-indigo-600 transition select-none">
                {{ num1 }} + {{ num2 }} = ?
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="rememberMe" class="w-4 h-4 accent-indigo-500 rounded" />
            <span class="text-sm text-indigo-200">记住密码</span>
          </label>

          <!-- Submit -->
          <button type="submit" :disabled="loading"
            class="w-full h-11 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? '登录中...' : '登 录' }}
          </button>
        </form>
      </div>
      <p class="text-center text-indigo-400/60 text-xs mt-4">© 2026 校园信息墙管理后台</p>
    </div>
  </div>
</template>
