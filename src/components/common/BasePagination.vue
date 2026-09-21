<script setup>
import { computed } from 'vue'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from '@lucide/vue'
import BaseToolbar from '@/components/common/BaseToolbar.vue'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50],
  },
})

const pagination = defineModel('pagination', { type: Object, required: true })

const page = computed({
  get: () => pagination.value.pageIndex + 1,
  set: (value) => {
    pagination.value = { ...pagination.value, pageIndex: value - 1 }
  },
})

const pageSize = computed({
  get: () => pagination.value.pageSize,
  set: (value) => {
    pagination.value = { pageIndex: 0, pageSize: value }
  },
})

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / pageSize.value)))

const canPrev = computed(() => page.value > 1)
const canNext = computed(() => page.value < pageCount.value)

const rangeStart = computed(() => (props.total === 0 ? 0 : (page.value - 1) * pageSize.value + 1))
const rangeEnd = computed(() => Math.min(page.value * pageSize.value, props.total))
</script>

<template>
  <BaseToolbar position="bottom">
    <span class="page-range">Showing {{ rangeStart }}–{{ rangeEnd }} of {{ total }}</span>

    <span class="spacer" />

    <label class="page-size">
      Rows per page
      <select v-model.number="pageSize">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </label>

    <div class="page-controls">
      <button type="button" :disabled="!canPrev" aria-label="First page" @click="page = 1">
        <ChevronFirst :size="14" />
      </button>
      <button type="button" :disabled="!canPrev" aria-label="Previous page" @click="page--">
        <ChevronLeft :size="14" />
      </button>
      <span class="page-indicator">{{ page }} / {{ pageCount }}</span>
      <button type="button" :disabled="!canNext" aria-label="Next page" @click="page++">
        <ChevronRight :size="14" />
      </button>
      <button type="button" :disabled="!canNext" aria-label="Last page" @click="page = pageCount">
        <ChevronLast :size="14" />
      </button>
    </div>
  </BaseToolbar>
</template>

<style scoped>
.page-range {
  color: #6b7280;
  font-size: 0.8rem;
}

.spacer {
  flex: 1;
}

.page-size {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.8rem;
}

.page-size select {
  padding: 5px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2937;
  font-size: 0.8rem;
}

.page-controls {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.page-controls button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2937;
  font-size: 0.8rem;
  cursor: pointer;
}

.page-controls button:hover:not(:disabled) {
  border-color: #7c3aed;
  color: #7c3aed;
}

.page-controls button:disabled {
  opacity: 0.4;
  cursor: default;
}

.page-indicator {
  min-width: 52px;
  color: #6b7280;
  font-size: 0.8rem;
  text-align: center;
}
</style>
