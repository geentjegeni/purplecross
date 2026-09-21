<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Are you sure?',
  },
  message: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="dialog-overlay" @click.self="emit('cancel')">
      <div class="dialog" role="dialog" aria-modal="true" :aria-label="title">
        <h2 class="dialog-title">{{ title }}</h2>

        <p v-if="message" class="dialog-message">{{ message }}</p>

        <div class="dialog-actions">
          <BaseButton variant="secondary" @click="emit('cancel')">Cancel</BaseButton>
          <BaseButton variant="danger" :disabled="loading" @click="emit('confirm')">
            {{ confirmLabel }}
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(17 24 39 / 50%);
}

.dialog {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgb(0 0 0 / 15%);
}

.dialog-title {
  margin: 0 0 8px;
  color: #111827;
  font-size: 1.1rem;
}

.dialog-message {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}
</style>
