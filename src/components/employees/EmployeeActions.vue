<script setup>
import { Eye, Pencil, Trash2 } from '@lucide/vue'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  employee: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="row-actions">
    <BaseButton
      :to="`/employees/${employee.code}`"
      variant="secondary"
      icon
      aria-label="View employee"
    >
      <Eye :size="16" />
    </BaseButton>

    <BaseButton
      :to="`/employees/${employee.code}?edit=true`"
      variant="secondary"
      icon
      aria-label="Edit employee"
    >
      <Pencil :size="16" />
    </BaseButton>

    <BaseButton
      variant="danger"
      icon
      aria-label="Delete employee"
      @click="emit('delete', employee)"
    >
      <Trash2 :size="16" />
    </BaseButton>
  </div>
</template>

<style scoped>
.row-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
