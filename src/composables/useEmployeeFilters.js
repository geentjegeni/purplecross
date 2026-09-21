import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'

function matchesSelection(selected, value) {
  return !selected.length || selected.includes(value)
}

export function useEmployeeFilters() {
  const { employees, searchQuery, selectedDepartments, selectedOccupations, departments, occupations } =
    storeToRefs(useEmployeeStore())

  const filteredEmployees = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    return employees.value.filter(
      (employee) =>
        matchesSelection(selectedDepartments.value, employee.department) &&
        matchesSelection(selectedOccupations.value, employee.occupation) &&
        matchesQuery(employee, query),
    )
  })

  return {
    searchQuery,
    selectedDepartments,
    selectedOccupations,
    departments,
    occupations,
    filteredEmployees,
  }
}

function matchesQuery(employee, query) {
  return (
    !query ||
    [employee.fullName, employee.occupation, employee.department].some((field) =>
      field?.toLowerCase().includes(query),
    )
  )
}
