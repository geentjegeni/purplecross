import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import employeeService from '@/services/employeeService'

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort()
}

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const searchQuery = ref('')
  const selectedDepartments = ref([])
  const selectedOccupations = ref([])

  const departments = computed(() =>
    uniqueSorted(employees.value.map((employee) => employee.department)),
  )

  const occupations = computed(() =>
    uniqueSorted(employees.value.map((employee) => employee.occupation)),
  )

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

  async function addEmployee(employee) {
    const created = await employeeService.createEmployee(employee)
    employees.value.push(created)
    return created
  }

  return {
    employees,
    isLoading,
    error,
    searchQuery,
    selectedDepartments,
    selectedOccupations,
    departments,
    occupations,
    fetchEmployees,
    addEmployee,
  }
})
