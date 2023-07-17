const db = require('./db');

class Department {
    static async getAllDepartments() {
        try {
          const rows = await db.query('SELECT * FROM departments');
          return rows || [];
        } catch (err) {
          throw err;
        }
      }
    
      static async createDepartment(name) {
        try {
          await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
          console.log('Department created successfully.');
        } catch (err) {
          throw err;
        }
      }
    
      static async deleteDepartment(departmentId) {
        try {
          await db.query('DELETE FROM departments WHERE id = ?', [departmentId]);
          console.log('Department deleted successfully.');
        } catch (err) {
          throw err;
        }
      }
    }

module.exports = Department;