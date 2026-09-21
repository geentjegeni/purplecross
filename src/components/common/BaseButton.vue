<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  icon: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: null,
  },
})
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="btn"
    :class="[`btn-${variant}`, { 'btn-icon': icon }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.btn-primary {
  background: #7c3aed;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #6d28d9;
}

.btn-secondary {
  border-color: #d1d5db;
  background: #ffffff;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn-danger {
  background: #dc2626;
  color: #ffffff;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn-icon {
  width: 30px;
  height: 30px;
  padding: 0;
  border-color: #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
}

.btn-icon.btn-secondary:hover:not(:disabled),
.btn-icon.btn-primary:hover:not(:disabled) {
  border-color: #7c3aed;
  background: #ffffff;
  color: #7c3aed;
}

.btn-icon.btn-danger:hover:not(:disabled) {
  border-color: #dc2626;
  background: #ffffff;
  color: #dc2626;
}
</style>
