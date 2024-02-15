import os from "os";
import cl from "cli-color";
import dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import * as readlineSync from "readline-sync";
import bcrypt from "bcryptjs";

dotenv.config();

console.log(cl.bgCyan(`Welcome ! ${os.hostname} `));
console.log("");
console.log("Academic-Analyzer-App-Backend");
console.log("");
console.log(cl.yellow(" DB Connection Details :- "));

async function connectToMySQL() {
  try {
    const port = process.env.DBPORT;
    const pool = mysql.createPool({
      host: host,
      user: username,
      password: db_password,
      database: database,
      port: Number(port),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    const connection = await pool.getConnection();
    console.log(cl.bgGreen("Connected To DB"));
    console.log("");

    console.log(cl.yellow(" Admin Acc Details :- "));

    console.log(cl.green("Enter Your First Name "));
    let firstName = readlineSync.question();
    console.log(cl.green("Enter Your Middle Name "));
    let middleName = readlineSync.question();
    console.log(cl.green("Enter Your Last Name "));
    let lastName = readlineSync.question();
    console.log(cl.green("Enter Your Email"));
    let email = readlineSync.questionEMail();
    console.log(cl.green("Enter Your Phone Number "));
    let phoneNo = Number(readlineSync.question());
    let password = readlineSync.questionNewPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const department_name = "ADMIN01";
    let role = process.env.ADMIN;

    const insertDept = `INSERT INTO Department (code,name) VALUES (?,?)`;
    await connection.execute(insertDept, ["ADMIN01", "DEPT"]);

    const insertQuery = `INSERT INTO User (firstName, middleName, lastName, email, phoneNo, password,department_name,role) VALUES (?,?,?,?,?,?,?,?) `;
    await connection.execute(insertQuery, [
      firstName,
      middleName,
      lastName,
      email,
      phoneNo,
      hashedPassword,
      department_name,
      role,
    ]);
    console.log(cl.blue("Admin Created Successfully"));
    console.log(cl.blue("Ready To Go 🚀"));
    console.log(cl.underline(cl.cyan("🔗", "http://localhost:3000")));
    process.exit(0);
    return;
  } catch (error) {
    console.error(error);
  }
}

console.log(cl.green("Hostname"));
let host = readlineSync.question();
console.log(cl.green("Username"));
let username = readlineSync.question();
console.log(cl.green("Password"));
let db_password = readlineSync.question().toString();
console.log(cl.green("Schema"));
let database = readlineSync.question();

connectToMySQL();
