import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { getDateStatus } from '@/utils/employees/dateUtils'
import EmployeeActions from '@/components/employees/EmployeeActions.vue'

const columnHelper = createColumnHelper()

export function createEmployeeColumns({ onDelete } = {}) {
  return [
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
        const status = getDateStatus(info.getValue())

        return status === 'future' ? 'Employed soon' : 'Currently employed'
      },
    }),

    columnHelper.accessor((employee) => employee.terminationDate ?? undefined, {
      id: 'terminationDate',
      header: 'Termination Date',
      sortUndefined: 'last',

      cell: (info) => {
        const status = getDateStatus(info.getValue())

        if (!status) {
          return ''
        }

        return status === 'future' ? 'To be terminated' : 'Terminated'
      },
    }),

    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => h(EmployeeActions, { employee: info.row.original, onDelete }),
    }),
  ]
}
