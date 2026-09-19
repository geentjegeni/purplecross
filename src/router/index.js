import { createRouter, createWebHistory } from 'vue-router'

import EmployeeListView from '@/views/EmployeeListView.vue'
import EmployeeCreateView from '@/views/EmployeeCreateView.vue'
import EmployeeProfileView from '@/views/EmployeeProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/employees',
    },
    {
      path: '/employees',
      component: EmployeeListView,
    },
    {
      path: '/employees/new',
      component: EmployeeCreateView,
    },
    {
      path: '/employees/:id',
      component: EmployeeProfileView,
    },
  ],
})

export default router
