import employeesData from '@/data/employees.json'

// In-memory stand-in for a backend; owns the dataset
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

  async updateEmployee(code, employee) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.#employees.findIndex((e) => e.code === code)
        if (index === -1) {
          reject(new Error(`Employee ${code} not found`))
          return
        }
        const updated = { ...employee, code }
        this.#employees[index] = updated
        resolve(updated)
      }, 300)
    })
  }

  async importEmployees(imported) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let added = 0
        let updated = 0

        for (const employee of imported) {
          const index = this.#employees.findIndex(
            (e) => e.code.toLowerCase() === employee.code.toLowerCase(),
          )
          if (index === -1) {
            this.#employees.push(employee)
            added++
          } else {
            this.#employees[index] = { ...employee, code: this.#employees[index].code }
            updated++
          }
        }

        resolve({ employees: [...this.#employees], added, updated })
      }, 300)
    })
  }

  async deleteEmployee(code) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.#employees.findIndex((e) => e.code === code)
        if (index === -1) {
          reject(new Error(`Employee ${code} not found`))
          return
        }
        this.#employees.splice(index, 1)
        resolve()
      }, 300)
    })
  }
}

export default new EmployeeService()
