import employeesData from '@/data/employees.json'

// In-memory stand-in for a backend; owns the dataset and code generation.
class EmployeeService {
  #employees = [...employeesData]

  async getEmployees() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.#employees])
      }, 500)
    })
  }

  async createEmployee(employee) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#employees.push(employee)
        resolve(employee)
      }, 300)
    })
  }
}

export default new EmployeeService()
