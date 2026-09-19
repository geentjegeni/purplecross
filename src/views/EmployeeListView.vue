<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()
const { employees, isLoading, error } = storeToRefs(employeeStore)

onMounted(() => {
  employeeStore.fetchEmployees()
})
</script>

<template>
  <main>
    <h1>Employees</h1>

    <p v-if="isLoading">Loading employees...</p>
    <p v-else-if="error">Failed to load employees.</p>

    <ul v-else>
      <li v-for="employee in employees" :key="employee.code">
        Name: {{ employee.fullName }} / Occupation: {{ employee.occupation }} / Department:
        {{ employee.department }}
      </li>
    </ul>
  </main>
</template>
