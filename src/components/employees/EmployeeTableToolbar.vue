<script setup>
import { Download, Upload } from '@lucide/vue'
import BaseInput from '@/components/common/BaseInput.vue'
import MultiSelect from '@/components/common/MultiSelect.vue'
import BaseToolbar from '@/components/common/BaseToolbar.vue'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  departmentOptions: {
    type: Array,
    required: true,
  },
  occupationOptions: {
    type: Array,
    required: true,
  },
})

const search = defineModel('search', { type: String, default: '' })
const departments = defineModel('departments', { type: Array, default: () => [] })
const occupations = defineModel('occupations', { type: Array, default: () => [] })

const emit = defineEmits(['import', 'export'])
</script>

<template>
  <BaseToolbar>
    <BaseInput
      v-model="search"
      type="search"
      class="toolbar-search"
      placeholder="Search by name, occupation or department..."
      aria-label="Search employees"
    />

    <MultiSelect v-model="departments" label="Department" :options="departmentOptions" />

    <MultiSelect v-model="occupations" label="Occupation" :options="occupationOptions" />

    <div class="toolbar-actions">
      <BaseButton variant="secondary" @click="emit('import')">
        <Upload :size="15" /> Import
      </BaseButton>

      <BaseButton variant="secondary" @click="emit('export')">
        <Download :size="15" /> Export
      </BaseButton>
    </div>
  </BaseToolbar>
</template>

<style scoped>
.toolbar-search {
  flex: 1 1 260px;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

@media (max-width: 640px) {
  .toolbar-search {
    flex-basis: 100%;
  }

  .toolbar-actions {
    width: 100%;
  }

  .toolbar-actions :deep(.btn) {
    flex: 1;
  }
}
</style>
