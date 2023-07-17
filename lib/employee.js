const db = require('./db');

class Employee {
  static async getAllEmployees() {
    try {
      const rows = await db.query(`
        SELECT 
          employees.id, 
          employees.first_name, 
          employees.last_name, 
          roles.title, 
          departments.name AS department, 
          roles.salary, 
          CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM 
          employees
        INNER JOIN 
          roles ON employees.role_id = roles.id
        INNER JOIN 
          departments ON roles.department_id = departments.id
        LEFT JOIN 
          employees manager ON employees.manager_id = manager.id
      `);
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  static async createEmployee(firstName, lastName, roleId, managerId) {
    try {
      await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        roleId,
        managerId,
      ]);
      console.log('Employee created successfully.');
    } catch (err) {
      throw err;
    }
  }

  static async updateEmployee(employeeId, roleId, managerId, firstName, lastName) {
    try {
      await db.query('UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?', [
        firstName,
        lastName,
        roleId,
        managerId,
        employeeId,
      ]);
      console.log('Employee updated successfully.');
    } catch (err) {
      throw err;
    }
  }

  static async deleteEmployee(employeeId) {
    try {
      await db.query('DELETE FROM employees WHERE id = ?', [employeeId]);
      console.log('Employee deleted successfully.');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Employee;