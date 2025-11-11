const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2")

app.use(cors())
app.use(express.json())

const dbconn = mysql.createConnection({
    host: "ciacloud.in",
    user: "tpuser",
    password: "%TGBbgt5",
    database: "tpdb"
})

dbconn.connect((err)=> {
    if(err) 
        console.log(err);
    console.log("mysql connected successfully")
})

app.get("/", (req, res) => {
    sql = `SELECT * FROM shital_employees`
    dbconn.query(sql, (err, result) => {
        res.send(result)
    })
})

app.post("/", (req, res) => {
    sql = `INSERT INTO shital_ems (id, name, manager, department, salary) VALUES (NULL, '${empName}', '${manager}', '${department}', '${salary}')`
})

app.listen(3001, () => {
    console.log("server running on port 3001");
    
})