<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useEmployeeFilters } from '@/composables/useEmployeeFilters'
import EmployeeTable from '@/components/employees/EmployeeTable.vue'
import EmployeeTableToolbar from '@/components/employees/EmployeeTableToolbar.vue'

const employeeStore = useEmployeeStore()
const { isLoading, error } = storeToRefs(employeeStore)

const {
  searchQuery,
  selectedDepartments,
  selectedOccupations,
  departments,
  occupations,
  filteredEmployees,
} = useEmployeeFilters()

onMounted(() => {
  employeeStore.fetchEmployees()
})
</script>

<template>
  <main class="page">
    <div class="page-header">
      <p class="page-company-title">Purple Cross Ltd.</p>

      <h1>Employees</h1>

      <p class="page-description">Manage your organization's employees and employment details.</p>
    </div>

    <section class="card">
      <div v-if="isLoading" class="state">Loading employees...</div>

      <div v-else-if="error" class="state state-error">Failed to load employees.</div>

      <template v-else>
        <EmployeeTableToolbar
          v-model:search="searchQuery"
          v-model:departments="selectedDepartments"
          v-model:occupations="selectedOccupations"
          :department-options="departments"
          :occupation-options="occupations"
        />

        <EmployeeTable :employees="filteredEmployees" />
      </template>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px;
  background: #f6f7f9;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 24px;
}

.page-company-title {
  margin: 0 0 6px;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 2rem;
  line-height: 1.2;
}

.page-description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.card {
  --card-radius: 12px;

  max-width: 1400px;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  border-radius: var(--card-radius);
  background: #ffffff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 4%);
}

.state {
  padding: 48px 24px;
  color: #6b7280;
  text-align: center;
}

.state-error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .page {
    padding: 24px 16px;
  }

  h1 {
    font-size: 1.6rem;
  }

  .card {
    --card-radius: 10px;
  }
}
</style>
