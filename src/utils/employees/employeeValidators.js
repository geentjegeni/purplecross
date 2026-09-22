export const EMPLOYEE_FIELDS = [
  'code',
  'fullName',
  'occupation',
  'department',
  'dateOfEmployment',
  'terminationDate',
]

// Shared per-field employee rules. Each returns an error message or ''.
// `employee` gives cross-field context (e.g. termination date vs employment date).
export const employeeFieldValidators = {
  code: (value) => (value?.trim() ? '' : 'Code is required'),

  fullName: (value) => {
    if (!value?.trim()) {
      return 'Full name is required'
    }
    return value.trim().includes(' ') ? '' : 'Enter first and last name'
  },

  occupation: (value) => (value?.trim() ? '' : 'Occupation is required'),

  department: (value) => (value?.trim() ? '' : 'Department is required'),

  dateOfEmployment: (value, employee) =>
    !value && employee?.terminationDate ? 'Required when a termination date is set' : '',

  terminationDate: (value, employee) =>
    value && employee?.dateOfEmployment && value < employee.dateOfEmployment
      ? 'Must be after the employment date'
      : '',
}
