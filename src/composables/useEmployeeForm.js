import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'
import { EMPLOYEE_FIELDS, employeeFieldValidators } from '@/utils/employees/employeeValidators'

export function useEmployeeForm(initial = null) {
  const employeeStore = useEmployeeStore()
  const { departments, occupations } = storeToRefs(employeeStore)

  const toFieldValues = (source) =>
    Object.fromEntries(EMPLOYEE_FIELDS.map((field) => [field, source?.[field] ?? '']))

  const pristine = reactive(toFieldValues(initial))
  const draft = reactive(toFieldValues(initial))

  const isDirty = computed(() => EMPLOYEE_FIELDS.some((field) => draft[field] !== pristine[field]))

  function markClean() {
    Object.assign(pristine, draft)
  }

  const errors = reactive({})

  const validators = {
    ...employeeFieldValidators,
    code: (value) => {
      const required = employeeFieldValidators.code(value)
      if (required) {
        return required
      }
      const duplicate = employeeStore.employees.some(
        (employee) =>
          employee.code.toLowerCase() === value.trim().toLowerCase() &&
          employee.code !== initial?.code,
      )
      return duplicate ? 'This code is already in use' : ''
    },
  }

  function validateField(field) {
    const message = validators[field](draft[field], draft)
    if (message) {
      errors[field] = message
    } else {
      delete errors[field]
    }
    return !message
  }

  function validateAll() {
    return Object.keys(validators).map(validateField).every(Boolean)
  }

  const isValid = computed(() =>
    Object.keys(validators).every((field) => !validators[field](draft[field], draft)),
  )

  function toPayload() {
    return {
      code: draft.code.trim(),
      fullName: draft.fullName.trim(),
      occupation: draft.occupation.trim(),
      department: draft.department.trim(),
      dateOfEmployment: draft.dateOfEmployment || null,
      terminationDate: draft.terminationDate || null,
    }
  }

  return {
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
  }
}
