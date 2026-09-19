<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'
import EmployeeTable from '@/components/employees/EmployeeTable.vue'

const employeeStore = useEmployeeStore()
const { employees, isLoading, error } = storeToRefs(employeeStore)

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

      <EmployeeTable v-else :employees="employees" />
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
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
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
    border-radius: 10px;
  }
}
</style>
