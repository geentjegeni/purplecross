import Papa from 'papaparse'
import { EMPLOYEE_FIELDS, employeeFieldValidators } from '@/utils/employees/employeeValidators'

export function employeesToCsv(employees) {
  return Papa.unparse(
    employees.map((employee) =>
      Object.fromEntries(EMPLOYEE_FIELDS.map((field) => [field, employee[field] ?? ''])),
    ),
    { columns: EMPLOYEE_FIELDS },
  )
}

export function csvToEmployees(text) {
  const { data, errors: parseErrors } = Papa.parse(text.trim(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  })

  if (parseErrors.length) {
    return { employees: [], errors: [`Invalid CSV: ${parseErrors[0].message}`] }
  }

  if (!data.length) {
    return { employees: [], errors: ['The file contains no employee rows.'] }
  }

  const employees = []
  const errors = []
  const seenCodes = new Set()

  data.forEach((row, index) => {
    const line = index + 2
    const employee = Object.fromEntries(
      EMPLOYEE_FIELDS.map((field) => [field, (row[field] ?? '').trim()]),
    )
    employee.dateOfEmployment ||= null
    employee.terminationDate ||= null

    const fieldErrors = Object.entries(employeeFieldValidators)
      .map(([field, validate]) => validate(employee[field], employee))
      .filter(Boolean)

    if (fieldErrors.length) {
      errors.push(`Row ${line}: ${fieldErrors.join('; ')}`)
      return
    }

    const normalizedCode = employee.code.toLowerCase()
    if (seenCodes.has(normalizedCode)) {
      errors.push(`Row ${line}: duplicate code ${employee.code}`)
      return
    }
    seenCodes.add(normalizedCode)

    employees.push(employee)
  })

  return { employees, errors }
}
