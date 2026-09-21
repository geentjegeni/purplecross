<script setup>
defineProps({
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value),
  },
})
</script>

<template>
  <div class="toolbar" :class="`toolbar-${position}`">
    <slot />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
}

.toolbar-top {
  border-bottom: 1px solid #eef0f3;
}

.toolbar-bottom {
  border-top: 1px solid #eef0f3;
}
</style>
