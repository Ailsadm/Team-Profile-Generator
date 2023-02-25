const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];
let employeeTypeSelector = ""


async function getEmployeeType() {
  console.log('point 1 ')
  const employeeTypeAnswers = await inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select Employee Type',
        name: 'Employee',
        choices: ["Manager", "Engineer", "Intern", "Team Completed"],

      },
    ])
  employeeTypeSelector = employeeTypeAnswers.Employee[0];
  console.log(employeeTypeAnswers)


  if (employeeTypeSelector === "Manager") {
    const managerDetailAnswers = await inquirer.prompt([
      {

        type: 'input',
        name: 'Name',
        message: "Employee Name?",
      },
      {
        type: 'input',
        name: 'Id',
        message: "Employee ID?",
      },
      {
        type: 'input',
        name: 'Email',
        message: "Email Address?",
      },
      {
        type: 'input',
        name: 'Number',
        message: "Office Number",
      },
    ])

    const manager = new Manager(
      managerDetailAnswers.Name,
      managerDetailAnswers.Id,
      managerDetailAnswers.Email,
      managerDetailAnswers.Number,
    );
    team.push(manager);
  };



  if (employeeTypeSelector === "Engineer") {
    let engineerAnswers = await inquirer.prompt([
      {

        type: 'input',
        name: 'Name',
        message: "Employee Name?",
      },
      {
        type: 'input',
        name: 'Id',
        message: "Employee ID?",
      },
      {
        type: 'input',
        name: 'Email',
        message: "Email Address?",
      },
      {
        type: 'input',
        name: 'Github',
        message: "Github UserName?",
      },
    ])

    const engineer = new Engineer(
      engineerAnswers.Name,
      engineerAnswers.Id,
      engineerAnswers.Email,
      engineerAnswers.Github,
    );
    team.push(engineer);

  }

  if (employeeTypeSelector === "Intern") {
    let internAnswers = await inquirer.prompt([
      {

        type: 'input',
        name: 'Name',
        message: "Employee Name?",
      },
      {
        type: 'input',
        name: 'Id',
        message: "Employee ID?",
      },
      {
        type: 'input',
        name: 'Email',
        message: "Email Address?",
      },
      {
        type: 'input',
        name: 'School',
        message: "School?",
      },
    ])

    const intern = new Intern(
      internAnswers.Name,
      internAnswers.Id,
      internAnswers.Email,
      internAnswers.School,
    );
    team.push(intern);
  }

}


async function startProgram() {
  for (let i = 0; i < 5; i++) {
    await getEmployeeType()
   }

  // team.push(new Manager("Andrew", 1, "test@test.com", 8426))
  // team.push(new Engineer("Gertrude", 2, "test@test.com", "github"))
  // team.push(new Intern("Max", 3, "test@test.com", "Harvard"))
  let htmlDoc = render(team)

  fs.writeFile(outputPath, htmlDoc, function (err) {
    if (err) throw err;
    console.log('File written successfully!');
  });

}

startProgram()

