<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDown } from '@lucide/vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel({ type: Array, default: () => [] })

const root = ref(null)
const isOpen = ref(false)

const selected = computed(() => new Set(model.value))

const buttonLabel = computed(() =>
  model.value.length ? `${props.label} (${model.value.length})` : props.label,
)

function toggleOption(option) {
  model.value = selected.value.has(option)
    ? model.value.filter((value) => value !== option)
    : [...model.value, option]
}

function clearSelection() {
  model.value = []
}

function onClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="root" class="multi-select" @keydown.escape="isOpen = false">
    <button
      type="button"
      class="multi-select-button"
      :class="{ 'is-active': model.length }"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      {{ buttonLabel }}
      <ChevronDown :size="14" class="chevron" :class="{ 'chevron-open': isOpen }" />
    </button>

    <div v-if="isOpen" class="multi-select-panel">
      <ul class="multi-select-options">
        <li v-for="option in options" :key="option">
          <label class="multi-select-option">
            <input type="checkbox" :checked="selected.has(option)" @change="toggleOption(option)" />
            {{ option }}
          </label>
        </li>

        <li v-if="options.length === 0" class="multi-select-empty">No options</li>
      </ul>

      <button v-if="model.length" type="button" class="multi-select-clear" @click="clearSelection">
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped>
.multi-select {
  position: relative;
}

.multi-select-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #1f2937;
  font-size: 0.875rem;
  cursor: pointer;
}

.multi-select-button:hover {
  border-color: #9ca3af;
}

.multi-select-button.is-active {
  border-color: #7c3aed;
  color: #7c3aed;
  font-weight: 600;
}

.multi-select-button:focus-visible {
  border-color: #7c3aed;
  outline: 2px solid #7c3aed33;
}

.chevron {
  transition: transform 0.15s ease;
}

.chevron-open {
  transform: rotate(180deg);
}

.multi-select-panel {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);
}

.multi-select-options {
  max-height: 240px;
  margin: 0;
  padding: 6px;
  overflow-y: auto;
  list-style: none;
}

.multi-select-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 6px;
  color: #1f2937;
  font-size: 0.875rem;
  cursor: pointer;
}

.multi-select-option:hover {
  background: #f3f4f6;
}

.multi-select-option input {
  accent-color: #7c3aed;
}

.multi-select-empty {
  padding: 10px 8px;
  color: #9ca3af;
  font-size: 0.85rem;
}

.multi-select-clear {
  width: 100%;
  padding: 8px;
  border: none;
  border-top: 1px solid #eef0f3;
  background: #f9fafb;
  color: #7c3aed;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.multi-select-clear:hover {
  background: #f3f4f6;
}
</style>
