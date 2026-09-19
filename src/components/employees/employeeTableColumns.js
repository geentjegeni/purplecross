import { createColumnHelper } from '@tanstack/vue-table'

const columnHelper = createColumnHelper()

export const employeeTableColumns = [
  columnHelper.accessor('code', {
    header: 'Code',
  }),

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
  }),

  columnHelper.accessor('terminationDate', {
    header: 'Termination Date',
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
  }),
]
