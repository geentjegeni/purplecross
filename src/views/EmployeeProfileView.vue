<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useToast } from '@/composables/useToast'
import EmployeeForm from '@/components/employees/EmployeeForm.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
const { isLoading } = storeToRefs(employeeStore)
const toast = useToast()

const isSaving = ref(false)

const employee = computed(() => employeeStore.employeeByCode(route.params.code))
const isEditing = computed(() => route.query.edit === 'true')

onMounted(() => {
  if (!employeeStore.employees.length) {
    employeeStore.fetchEmployees()
  }
})

async function onSubmit(payload) {
  isSaving.value = true
  try {
    await employeeStore.updateEmployee(route.params.code, payload)
    toast.success(`Employee ${payload.fullName} updated`)
    router.push(`/employees/${route.params.code}`)
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
      <p class="page-company-title">Purple Cross Ltd.</p>

      <h1 class="page-title">{{ isEditing ? 'Edit Employee' : 'Employee Profile' }}</h1>

      <p v-if="employee" class="page-description">{{ employee.fullName }}</p>
    </div>

    <section class="card profile-card">
      <div v-if="isLoading" class="state">Loading employee...</div>

      <div v-else-if="!employee" class="state">
        Employee not found.
        <RouterLink to="/employees">Back to employees</RouterLink>
      </div>

      <EmployeeForm
        v-else-if="isEditing"
        :initial="employee"
        :submitting="isSaving"
        @submit="onSubmit"
        @cancel="router.push('/employees')"
      />

      <template v-else>
        <dl class="profile-details">
          <div class="detail">
            <dt>Code</dt>
            <dd>{{ employee.code }}</dd>
          </div>

          <div class="detail">
            <dt>Full Name</dt>
            <dd>{{ employee.fullName }}</dd>
          </div>

          <div class="detail">
            <dt>Occupation</dt>
            <dd>{{ employee.occupation }}</dd>
          </div>

          <div class="detail">
            <dt>Department</dt>
            <dd>{{ employee.department }}</dd>
          </div>

          <div class="detail">
            <dt>Date of Employment</dt>
            <dd>{{ employee.dateOfEmployment || '' }}</dd>
          </div>

          <div class="detail">
            <dt>Termination Date</dt>
            <dd>{{ employee.terminationDate || '' }}</dd>
          </div>
        </dl>

        <div class="profile-actions">
          <BaseButton variant="secondary" @click="router.push('/employees')">Back</BaseButton>
          <BaseButton @click="router.push(`/employees/${employee.code}?edit=true`)">
            Edit
          </BaseButton>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
.profile-card {
  padding: 24px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
}

.detail dt {
  margin-bottom: 4px;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.detail dd {
  margin: 0;
  color: #1f2937;
  font-size: 0.95rem;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eef0f3;
}

@media (max-width: 640px) {
  .profile-details {
    grid-template-columns: 1fr;
  }
}
</style>
