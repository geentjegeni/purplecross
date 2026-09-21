import { createColumnHelper } from '@tanstack/vue-table'
import { getEmploymentDateStatus } from '@/utils/employees/dateUtils'

const columnHelper = createColumnHelper()

export const employeeTableColumns = [
  columnHelper.accessor('fullName', {
    header: 'Full Name',
  }),

  columnHelper.accessor('occupation', {
    header: 'Occupation',
  }),

  columnHelper.accessor('department', {
    header: 'Department',
  }),

  columnHelper.accessor('dateOfEmployment', {
    header: 'Date of Employment',

    cell: (info) => {
      const status = getEmploymentDateStatus(info.getValue())

      return status === 'future' ? 'Employed soon' : 'Currently employed'
    },
  }),

  columnHelper.accessor((employee) => employee.terminationDate ?? undefined, {
    id: 'terminationDate',
    header: 'Termination Date',
    sortUndefined: 'last',

    cell: (info) => {
      const status = getEmploymentDateStatus(info.getValue())

      if (!status) {
        return ''
      }

      return status === 'future' ? 'To be terminated' : 'Terminated'
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
  }),
]
