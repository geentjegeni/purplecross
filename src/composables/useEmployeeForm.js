import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/employeeStore'

const FIELDS = [
  'code',
  'fullName',
  'occupation',
  'department',
  'dateOfEmployment',
  'terminationDate',
]

export function useEmployeeForm(initial = null) {
  const employeeStore = useEmployeeStore()
  const { departments, occupations } = storeToRefs(employeeStore)

  const toFieldValues = (source) =>
    Object.fromEntries(FIELDS.map((field) => [field, source?.[field] ?? '']))

  const pristine = reactive(toFieldValues(initial))
  const draft = reactive(toFieldValues(initial))

  const isDirty = computed(() => FIELDS.some((field) => draft[field] !== pristine[field]))

  function markClean() {
    Object.assign(pristine, draft)
  }

  const errors = reactive({})

  const validators = {
    code: (value) => {
      if (!value.trim()) {
        return 'Code is required'
      }
      const duplicate = employeeStore.employees.some(
        (employee) =>
          employee.code.toLowerCase() === value.trim().toLowerCase() &&
          employee.code !== initial?.code,
      )
      return duplicate ? 'This code is already in use' : ''
    },
    fullName: (value) => {
      if (!value.trim()) {
        return 'Full name is required'
      }
      return value.trim().includes(' ') ? '' : 'Enter first and last name'
    },
    occupation: (value) => (value.trim() ? '' : 'Occupation is required'),
    department: (value) => (value.trim() ? '' : 'Department is required'),
    dateOfEmployment: (value) =>
      !value && draft.terminationDate ? 'Required when a termination date is set' : '',
    terminationDate: (value) =>
      value && draft.dateOfEmployment && value < draft.dateOfEmployment
        ? 'Must be after the employment date'
        : '',
  }

  function validateField(field) {
    const message = validators[field](draft[field])
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
    Object.keys(validators).every((field) => !validators[field](draft[field])),
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
