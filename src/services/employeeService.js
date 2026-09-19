import employees from '@/data/employees.json'

class EmployeeService {
  async getEmployees() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(employees)
      }, 500)
    })
  }
}

export default new EmployeeService()
