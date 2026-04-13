<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()
const noHeaderRoutes = ['/userlogin', '/register', '/forgot-password', '/admin/login']
const showHeader = computed(() => !noHeaderRoutes.includes(route.path))
</script>

<template>
  <div class="min-h-screen bg-[#F6F6F6]">
    <AppHeader v-if="showHeader" />
    <RouterView />
  </div>
</template>
