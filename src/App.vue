<script setup>
import { Toaster } from 'vue-sonner'
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <Toaster rich-colors />
</template>
