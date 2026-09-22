<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useToast } from '@/composables/useToast'
import EmployeeForm from '@/components/employees/EmployeeForm.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()
const toast = useToast()
const isSaving = ref(false)

onMounted(() => {
  if (!employeeStore.employees.length) {
    employeeStore.fetchEmployees()
  }
})

async function onSubmit(employee) {
  isSaving.value = true
  try {
    await employeeStore.addEmployee(employee)
    toast.success(`Employee ${employee.fullName} created`)
    router.push('/employees')
  } catch {
    toast.error('Failed to save the employee. Please try again.')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <main class="page">
    <div class="page-header">
      <h1 class="page-title">Create Employee</h1>

      <p class="page-description">Add a new employee to your organization.</p>
    </div>

    <section class="card form-card">
      <EmployeeForm :submitting="isSaving" @submit="onSubmit" @cancel="router.push('/employees')" />
    </section>
  </main>
</template>

<style scoped>
.form-card {
  padding: 24px;
}
</style>
