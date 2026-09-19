import { ref } from 'vue'
import { defineStore } from 'pinia'
import employeeService from '@/services/employeeService'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchEmployees() {
    isLoading.value = true
    error.value = null

    try {
      employees.value = await employeeService.getEmployees()
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    employees,
    isLoading,
    error,
    fetchEmployees,
  }
})
