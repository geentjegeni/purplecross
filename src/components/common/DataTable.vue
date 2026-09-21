<script setup>
import {
  FlexRender,
  createSortedRowModel,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'
import { ChevronDown, ChevronsUpDown, ChevronUp } from '@lucide/vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  tableKey: {
    type: String,
    default: 'data-table',
  },
  emptyMessage: {
    type: String,
    default: 'No data available.',
  },
  features: {
    type: Object,
    default: () => ({}),
  },
  tableOptions: {
    type: Object,
    default: () => ({}),
  },
})

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  ...props.features,
})

const table = useTable({
  key: props.tableKey,
  features,
  get columns() {
    return props.columns
  },
  get data() {
    return props.data
  },
  ...props.tableOptions,
})

</script>

<template>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="{ 'is-sortable': header.column.getCanSort() }"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <span class="th-content">
              <FlexRender :header="header" />
              <span v-if="header.column.getCanSort()" class="sort-indicator">
                <ChevronUp v-if="header.column.getIsSorted() === 'asc'" :size="14" />
                <ChevronDown v-else-if="header.column.getIsSorted() === 'desc'" :size="14" />
                <ChevronsUpDown v-else :size="14" class="sort-idle" />
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getAllCells()" :key="cell.id">
            <FlexRender :cell="cell" />
          </td>
        </tr>

        <tr v-if="table.getRowModel().rows.length === 0">
          <td class="empty-state" :colspan="table.getAllColumns().length">
            {{ emptyMessage }}
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

.data-table {
  width: 100%;
  border-collapse: collapse;
  color: #1f2937;
  font-size: 0.875rem;
}

.data-table th,
.data-table td {
  padding: 14px 20px;
  border-bottom: 1px solid #eef0f3;
  text-align: left;
  white-space: nowrap;
}

.data-table th {
  background: #f9fafb;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.data-table thead tr:first-child th:first-child {
  border-top-left-radius: var(--card-radius, 0);
}

.data-table thead tr:first-child th:last-child {
  border-top-right-radius: var(--card-radius, 0);
}

.data-table th.is-sortable {
  cursor: pointer;
  user-select: none;
}

.th-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.sort-indicator {
  display: inline-flex;
  color: #7c3aed;
}

.sort-idle {
  color: #9ca3af;
}

.data-table tbody tr {
  transition: background-color 0.15s ease;
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.empty-state {
  padding: 48px 24px;
  color: #9ca3af;
  text-align: center;
}

@media (max-width: 768px) {
  .data-table th,
  .data-table td {
    padding: 13px 16px;
  }
}
</style>
