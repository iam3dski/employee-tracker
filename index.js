// load environment variables into the application
require('dotenv').config();
// initialize variables
const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Department = require('./lib/department');
const Role = require('./lib/role');
const asciiArt =  `

      $$$$$$$$\                         $$\                                          
      $$  _____|                        $$ |                                         
      $$ |      $$$$$$\$$$$\   $$$$$$\  $$ | $$$$$$\  $$\   $$\  $$$$$$\   $$$$$$\   
      $$$$$\    $$  _$$  _$$\ $$  __$$\ $$ |$$  __$$\ $$ |  $$ |$$  __$$\ $$  __$$\  
      $$  __|   $$ / $$ / $$ |$$ /  $$ |$$ |$$ /  $$ |$$ |  $$ |$$$$$$$$ |$$$$$$$$ | 
      $$ |      $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$   ____|$$   ____| 
      $$$$$$$$\ $$ | $$ | $$ |$$$$$$$  |$$ |\$$$$$$  |\$$$$$$$ |\$$$$$$$\ \$$$$$$$\  
      \________|\__| \__| \__|$$  ____/ \__| \______/  \____$$ | \_______| \_______| 
                              $$ |                    $$\   $$ |                     
                              $$ |                    \$$$$$$  |                     
                              \__|                     \______/                      
      $$$$$$$\             $$\               $$\                                     
      $$  __$$\            $$ |              $$ |                                    
      $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$$$$$$\   $$$$$$\   $$$$$$$\  $$$$$$\  
      $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$  __$$\  \____$$\ $$  _____|$$  __$$\ 
      $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |  $$ | $$$$$$$ |\$$$$$$\  $$$$$$$$ |
      $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |  $$ |$$  __$$ | \____$$\ $$   ____|
      $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$$$$$$  |\$$$$$$$ |$$$$$$$  |\$$$$$$$\ 
      \_______/  \_______|  \____/  \_______|\_______/  \_______|\_______/  \_______|
                                                                                     
                                                                                     
                                                                                     
      $$\      $$\                                                                   
      $$$\    $$$ |                                                                  
      $$$$\  $$$$ | $$$$$$\  $$$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\        
      $$\$$\$$ $$ | \____$$\ $$  __$$\  \____$$\ $$  __$$\ $$  __$$\ $$  __$$\       
      $$ \$$$  $$ | $$$$$$$ |$$ |  $$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|      
      $$ |\$  /$$ |$$  __$$ |$$ |  $$ |$$  __$$ |$$ |  $$ |$$   ____|$$ |            
      $$ | \_/ $$ |\$$$$$$$ |$$ |  $$ |\$$$$$$$ |\$$$$$$$ |\$$$$$$$\ $$ |            
      \__|     \__| \_______|\__|  \__| \_______| \____$$ | \_______|\__|            
                                                 $$\   $$ |                          
                                                 \$$$$$$  |                          
                                                  \______/                           
`;

// Function to display the main menu
const displayMainMenu = () => {
    console.log(asciiArt); // Display the ASCII art
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menuOption',
          message: 'Please select an option:',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const selectedOption = answers.menuOption;
        switch (selectedOption) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(); // Stop the program
              default:
                console.log('Invalid option selected.');
                displayMainMenu();
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      };
  
// Function to view all departments
const viewAllDepartments = async () => {
    try {
      const departments = await Department.getAllDepartments();
      console.table(departments);
      displayMainMenu();
    } catch (err) {
      console.log('Error:', err);
      displayMainMenu();
    }
  };
  
  // Function to add a department
  const addDepartment = async () => {
    try {
      const departmentName = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
          validate: function (input) {
            return input.trim().length > 0 ? true : 'Please enter a department name.';
          },
        },
      ]);
      await Department.createDepartment(departmentName.departmentName);
      console.log('Department created successfully.');
      displayMainMenu(); // Call the main menu again
    } catch (error) {
      console.log('Error:', error);
      displayMainMenu(); // Call the main menu again
    }
  };
  
  // Function to view all roles
const viewAllRoles = async () => {
    try {
      const roles = await Role.getAllRoles();
      console.table(roles);
      displayMainMenu();
    } catch (err) {
      console.log('Error:', err);
      displayMainMenu();
    }
  };
  
// Function to view all employees
const viewAllEmployees = async () => {
    try {
      const employees = await Employee.getAllEmployees();
      console.table(employees);
      displayMainMenu();
    } catch (err) {
      console.log('Error:', err);
      displayMainMenu();
    }
  };
  
// Function to add a role
const addRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the title of the role:',
          validate: function (input) {
            return input.trim().length > 0 ? true : 'Please enter a role title.';
          },
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary for the role:',
          validate: function (input) {
            const isValid = parseFloat(input);
            return isValid ? true : 'Please enter a valid salary.';
          },
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
          validate: function (input) {
            const isValid = parseInt(input);
            return isValid ? true : 'Please enter a valid department ID.';
          },
        },
      ])
      .then(async (answers) => {
        try {
          const { roleTitle, roleSalary, departmentId } = answers;
          await Role.createRole(roleTitle, roleSalary, departmentId);
          console.log('Role created successfully.');
          displayMainMenu();
        } catch (err) {
          console.log('Error:', err);
          displayMainMenu();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        displayMainMenu();
      });
  };
  
// Function to add an employee
const addEmployee = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
          validate: function (input) {
            return input.trim().length > 0 ? true : 'Please enter a first name.';
          },
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
          validate: function (input) {
            return input.trim().length > 0 ? true : 'Please enter a last name.';
          },
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID for the employee:',
          validate: function (input) {
            const isValid = parseInt(input);
            return isValid ? true : 'Please enter a valid role ID.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the manager's ID for the employee (leave blank if none):",
          default: null,
          validate: function (input) {
            if (input === '') {
              return true;
            }
            const isValid = parseInt(input);
            return isValid ? true : 'Please enter a valid manager ID.';
          },
        },
      ])
      .then(async (answers) => {
        try {
          const { firstName, lastName, roleId, managerId } = answers;
          await Employee.createEmployee(firstName, lastName, roleId, managerId === '' ? null : managerId);
          console.log('Employee created successfully.');
          displayMainMenu();
        } catch (err) {
          console.log('Error:', err);
          displayMainMenu();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        displayMainMenu();
      });
  };
  
// Function to update an employee role
const updateEmployeeRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: "Enter the ID of the employee you want to update:",
          validate: function (input) {
            const isValid = parseInt(input);
            return isValid ? true : 'Please enter a valid employee ID.';
          },
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the new role ID for the employee:',
          validate: function (input) {
            const isValid = parseInt(input);
            return isValid ? true : 'Please enter a valid role ID.';
          },
        },
      ])
      .then(async (answers) => {
        try {
          const { employeeId, roleId } = answers;
          await Employee.updateEmployeeRole(employeeId, roleId);
          console.log('Employee role updated successfully.');
          displayMainMenu();
        } catch (err) {
          console.log('Error:', err);
          displayMainMenu();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        displayMainMenu();
      });
  };
  
  // Start the application
  displayMainMenu();