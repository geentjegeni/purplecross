import { createRouter, createWebHistory } from 'vue-router'

import EmployeeListView from '@/views/EmployeeListView.vue'
import EmployeeCreateView from '@/views/EmployeeCreateView.vue'
import EmployeeProfileView from '@/views/EmployeeProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'employees' },
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeListView,
    },
    {
      path: '/employees/new',
      name: 'employee-new',
      component: EmployeeCreateView,
    },
    {
      path: '/employees/:code',
      name: 'employee-profile',
      component: EmployeeProfileView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

export default router
