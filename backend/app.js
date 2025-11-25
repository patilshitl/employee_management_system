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
    try {
        let {name: name, department:department, salary: salary, manager_id: manager_id} = req.body;
        if(!name || !department || !salary || !manager_id){
            res.status(400).send("All Feild is required");
        }
        const sql = `INSERT INTO shital_ems (id, name, manager_id, department, salary, created_at, updated_at) VALUES (NULL, '${name}', '${manager_id}', '${department}', '${salary}', NOW(), NOW())`
        dbconn.query(sql, (err, result) => {
            console.log(result);
            res.send("Employee added succefully")
        })
    } catch (error) {
        res.status(500).send("server error");
    }
    
})

app.delete("/:id", (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).send("Employee ID is required");
    }

    const sql = "DELETE FROM shital_ems WHERE id = ?";

    dbconn.query(sql, [id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send("Database Error");
            
        }

        if(result.affectedRows == 0){
            return res.status(400).send("Employee Not Found");
        }

        res.send("Employess Deleted Sucessfully");
    });
});

app.put("/:id", (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).send("Employee ID is Required");
    }

    const sql = "UPDATE FROM shital_ems WHERE id = ?";

    dbconn.query(sql, [id], (err, result)=> {
        if(err){
            console.log(err);
            return res.status(500).send("Database Error");
        }
        
        if(result.affectedRows == 0){
            return res.status(400).send("Employee not found");
        }

        res.send("Employee data Updated")
    })
});

app.listen(3001, () => {
    console.log("server running on port 3001");
    
})