<script setup>
import { FlexRender, tableFeatures, useTable } from '@tanstack/vue-table'
import { employeeTableColumns } from './employeeTableColumns'

const props = defineProps({
  employees: {
    type: Array,
    required: true,
  },
})

const features = tableFeatures({})

const table = useTable({
  key: 'employee-table',
  features,
  columns: employeeTableColumns,
  get data() {
    return props.employees
  },
})
</script>

<template>
  <div class="table-wrapper">
    <table class="employee-table">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender :header="header" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getAllCells()" :key="cell.id">
            <FlexRender :cell="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  color: #1f2937;
  font-size: 0.875rem;
}

.employee-table th,
.employee-table td {
  padding: 14px 20px;
  border-bottom: 1px solid #eef0f3;
  text-align: left;
  white-space: nowrap;
}

.employee-table th {
  background: #f9fafb;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.employee-table tbody tr {
  transition: background-color 0.15s ease;
}

.employee-table tbody tr:hover {
  background: #f9fafb;
}

.employee-table tbody tr:last-child td {
  border-bottom: none;
}

@media (max-width: 768px) {
  .employee-table th,
  .employee-table td {
    padding: 13px 16px;
  }
}
</style>
