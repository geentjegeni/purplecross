<script setup>
import { computed } from 'vue'
import { createPaginatedRowModel, rowPaginationFeature } from '@tanstack/vue-table'
import DataTable from '@/components/common/DataTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import { createEmployeeColumns } from './employeeTableColumns'

const props = defineProps({
  employees: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const columns = createEmployeeColumns({
  onDelete: (employee) => emit('delete', employee),
})

const pagination = defineModel('pagination', {
  type: Object,
  default: () => ({ pageIndex: 0, pageSize: 10 }),
})

const features = {
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
}

const tableOptions = {
  state: computed(() => ({ pagination: pagination.value })),
  onPaginationChange: (next) => {
    pagination.value = typeof next === 'function' ? next(pagination.value) : next
  },
}
</script>

<template>
  <DataTable
    table-key="employee-table"
    :columns="columns"
    :data="employees"
    :features="features"
    :table-options="tableOptions"
    empty-message="No employees found."
  />

  <BasePagination v-model:pagination="pagination" :total="props.employees.length" />
</template>
