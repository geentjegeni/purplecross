<script setup>
import BaseInput from '@/components/common/BaseInput.vue'
import MultiSelect from '@/components/common/MultiSelect.vue'
import BaseToolbar from '@/components/common/BaseToolbar.vue'

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
  </BaseToolbar>
</template>

<style scoped>
.toolbar-search {
  flex: 1 1 260px;
}
</style>
