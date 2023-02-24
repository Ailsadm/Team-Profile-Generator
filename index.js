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
employeeType()

async function employeeType() {
  const answers = await inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select Employee Type',
        name: 'Employee',
        choices: ["Manager", "Engineer", "Intern", "Team Completed"],

      },
    ])
  .then((answers) => {
    employeeTypeSelector = answers;
  });
}
async function startProgram() {
  await employeeType()
  startProgram()
  // team.push(new Manager("Andrew", 1, "test@test.com", 8426))
  // team.push(new Engineer("Gertrude", 2, "test@test.com", "github"))
  // team.push(new Intern("Max", 3, "test@test.com", "Harvard"))

}

if (employeeTypeSelector === "Manager") {
  let generateManager = inquirer.prompt([
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
  .then((answers) => {
    const manager = new Manager(
      answers.Name,
        answers.Id,
        answers.Email,
        answers.Number,
        );
        team.push(manager);
      });
      
    }
    
    if (employeeTypeSelector === "Engineer") {
      let generateEngineer = inquirer.prompt([
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
    .then((answers) => {
      const engineer = new Engineer(
        answers.Name,
        answers.Id,
        answers.Email,
        answers.Github,
        );
        team.push(engineer);
      });
      employeeType()
    }
    
    if (employeeTypeSelector === "Intern") {
      let generateintern = inquirer.prompt([
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
    .then((answers) => {
      const intern = new Intern(
        answers.Name,
        answers.Id,
        answers.Email,
        answers.School,
        );
        team.push(intern);
      });
      employeeType()
    }
    
if (employeeTypeSelector === "Team Completed") {
  
  let htmlDoc = render(team)
  
  fs.writeFile(outputPath, htmlDoc, function (err) {
    if (err) throw err;
    console.log('File written successfully!');
  });
}