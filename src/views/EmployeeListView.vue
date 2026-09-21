<script setup>
import { onMounted, ref } from 'vue'
import { Plus } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useEmployeeFilters } from '@/composables/useEmployeeFilters'
import { useToast } from '@/composables/useToast'
import EmployeeTable from '@/components/employees/EmployeeTable.vue'
import EmployeeTableToolbar from '@/components/employees/EmployeeTableToolbar.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const employeeStore = useEmployeeStore()
const { isLoading, error } = storeToRefs(employeeStore)
const toast = useToast()

const pendingDelete = ref(null)
const isDeleting = ref(false)

async function onConfirmDelete() {
  isDeleting.value = true
  try {
    await employeeStore.deleteEmployee(pendingDelete.value.code)
    toast.success(`Employee ${pendingDelete.value.fullName} deleted`)
    pendingDelete.value = null
  } catch {
    toast.error('Failed to delete the employee. Please try again.')
  } finally {
    isDeleting.value = false
  }
}

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

      <h1 class="page-title">Employees</h1>

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

        <EmployeeTable
          :employees="filteredEmployees"
          @delete="(employee) => (pendingDelete = employee)"
        />
      </template>
    </section>

    <ConfirmDialog
      :open="!!pendingDelete"
      title="Delete employee"
      :message="`Are you sure you want to delete ${pendingDelete?.fullName}? This action cannot be undone.`"
      confirm-label="Delete"
      :loading="isDeleting"
      @confirm="onConfirmDelete"
      @cancel="pendingDelete = null"
    />

    <RouterLink to="/employees/new" class="fab" aria-label="Create employee">
      <Plus :size="22" />
    </RouterLink>
  </main>
</template>

<style scoped>
.fab {
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #7c3aed;
  color: #ffffff;
  box-shadow: 0 6px 16px rgb(124 58 237 / 35%);
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
}

.fab:hover {
  background: #6d28d9;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .fab {
    right: 20px;
    bottom: 20px;
  }
}
</style>
