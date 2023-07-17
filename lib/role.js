const db = require('./db');

class Role {
    static async getAllRoles() {
        try {
          const [rows] = await db.query(`
            SELECT roles.id, roles.title, roles.salary, departments.name AS department
            FROM roles
            INNER JOIN departments ON roles.department_id = departments.id
          `);
          return rows;
        } catch (err) {
          throw err;
        }
      }
    
      static async createRole(title, salary, departmentId) {
        try {
          await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
          console.log('Role created successfully.');
        } catch (err) {
          throw err;
        }
      }
    
      static async updateRole(roleId, title, salary, departmentId) {
        try {
          await db.query('UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?', [title, salary, departmentId, roleId]);
          console.log('Role updated successfully.');
        } catch (err) {
          throw err;
        }
      }
    
      static async deleteRole(roleId) {
        try {
          await db.query('DELETE FROM roles WHERE id = ?', [roleId]);
          console.log('Role deleted successfully.');
        } catch (err) {
          throw err;
        }
      }
    }
    
module.exports = Role;
