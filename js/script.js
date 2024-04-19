// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

let restoreEmployeeArr = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  return addNewEmployee();
};

const addNewEmployee = function () {
  const employeeArr = [];

  while (true) {
    const employeeData = {
      firstName: "",
      lastName: "",
      salary: 0,
    };
    let firstName = nameValidation("first name");
    if (firstName === null) break;

    let lastName = nameValidation("last name");
    if (lastName === null) break;

    let salary = salaryValidation(firstName, lastName);
    if (salary === null) break;

    employeeData.firstName = firstName;
    employeeData.lastName = lastName;
    employeeData.salary = salary;
    employeeArr.push(employeeData);
    const repeat = window.confirm(
      "Would you like to continue adding more employee?"
    );
    if (!repeat) {
      restoreEmployeeArr = employeeArr;
      return employeeArr;
    }
  }
  // console.log(employeeArr);
  return restoreEmployeeArr;
};

const nameValidation = function (firstLastName) {
  while (true) {
    let employeeName = window.prompt(`Enter employee's ${firstLastName}`);

    
    if (employeeName === null) {
      const stop = window.confirm("Data is NOT saved.\nAre you sure to quit?");
      if (stop) {
        return null;
      }
      continue;
    }

    if (employeeName.length === 0 || employeeName.length > 32) {
      window.alert(
        `${firstLastName} must have at least 1 character and at most 32 characters`
      );
      continue;
    }

    employeeName = cleanName(employeeName);
    if (
      employeeName === null ||
      employeeName.length == 0 ||
      employeeName.length > 32
    ) {
      window.alert(`${firstLastName} is INVALID`);
      continue;
    }

    return employeeName;
  }
};


const cleanName = function (name) {
  // remove leading and trailing non-alphabetic characters
  name = name.trim();

  let cleanName = [];
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);

    if ((char >= 97 && char <= 122) || (char >= 65 && char <= 90)) {
      cleanName.push(name.charAt(i));
    }else return null;
  }

  return cleanName.length != 0 ? cleanName.join("") : null;
};


const salaryValidation = function (firstName, lastName) {
  while (true) {
    let salary = window.prompt(`Enter ${firstName} ${lastName}'s salary`);

    // handle "cancel" option, ask user once again before quit
    if (salary === null) {
      const stop = window.confirm("Data is NOT saved.\nAre you sure to quit?");
      if (stop) return null;
      continue;
    }
    if (!isSalaryValid(salary)) {
      window.alert("INVALID salary");
      continue;
    }
    salary = parseFloat(salary);
    if (salary < 0.01 || salary > 1_000_000_000) {
      window.alert(
        "Salary must be at least $0.01 and cannot exceed $1,000,000,000"
      );
      continue;
    }

    return salary;
  }
};


const isSalaryValid = function (salary) {
  let period = false;

  for (let i = 0; i < 10; i++) {
    const digit = salary.charCodeAt(i);
    if (digit == 46) {
      if (period) return false;
      period = true;
      continue;
    }
    if (digit < 48 || digit > 57) return false;
  }

  return true;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  if (employeesArray.length == 0) {
    console.log("Cannot calculate average salary due to empty list");
    return;
  }
  let sum = 0;
  for (let employee of employeesArray) {
    sum += employee.salary;
  }

  console.log(`Average salary: $${sum / employeesArray.length}`);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  if (employeesArray.length == 0) {
    console.log("Cannot find any employees due to empty list");
    return;
  }
  console.log(
    `Random employee: ${
      employeesArray[Math.floor(Math.random() * employeesArray.length)]
        .firstName
    }`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  console.log(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
