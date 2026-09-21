<script setup>
import { useEmployeeForm } from '@/composables/useEmployeeForm'
import { useUnsavedChanges } from '@/composables/useUnsavedChanges'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  initial: {
    type: Object,
    default: null,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const {
  draft,
  errors,
  departments,
  occupations,
  validateField,
  validateAll,
  isValid,
  isDirty,
  markClean,
  toPayload,
} = useEmployeeForm(props.initial)

useUnsavedChanges(isDirty)

function onSubmit() {
  if (validateAll()) {
    markClean()
    emit('submit', toPayload())
  }
}
</script>

<template>
  <form class="employee-form" novalidate @submit.prevent="onSubmit">
    <div class="form-grid">
      <BaseInput
        v-model="draft.code"
        label="Code"
        required
        placeholder="e.g. EMP041"
        :error="errors.code"
        @blur="validateField('code')"
      />

      <BaseInput
        v-model="draft.fullName"
        label="Full Name"
        required
        placeholder="e.g. Jane Smith"
        :error="errors.fullName"
        @blur="validateField('fullName')"
      />

      <BaseInput
        v-model="draft.occupation"
        label="Occupation"
        required
        placeholder="e.g. Pharmacist"
        :options="occupations"
        :error="errors.occupation"
        @blur="validateField('occupation')"
      />

      <BaseInput
        v-model="draft.department"
        label="Department"
        required
        placeholder="e.g. Research"
        :options="departments"
        :error="errors.department"
        @blur="validateField('department')"
      />

      <BaseInput
        v-model="draft.dateOfEmployment"
        label="Date of Employment"
        type="date"
        :error="errors.dateOfEmployment"
        @blur="validateField('dateOfEmployment')"
      />

      <BaseInput
        v-model="draft.terminationDate"
        label="Termination Date"
        type="date"
        :error="errors.terminationDate"
        @blur="validateField('terminationDate')"
      />
    </div>

    <div class="form-actions">
      <BaseButton variant="secondary" @click="emit('cancel')">Cancel</BaseButton>
      <BaseButton
        type="submit"
        :disabled="submitting || !isValid"
        :title="isValid ? undefined : 'Fill in all required fields correctly'"
      >
        {{ submitting ? 'Saving...' : 'Save' }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eef0f3;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
