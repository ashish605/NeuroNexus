const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const port = 5000

// Middleware to parse JSON data from frontend
app.use(express.json());
app.use(cors()); // ✅ Allow cross-origin requests

mongoose.connect("mongodb://localhost:27017/office")  //conneting or creating a new database
.then(() => {
    console.log("connection done");
})
.catch(err => console.log("❌ MongoDB connection error:", err));


const userschema = new mongoose.Schema({   //defining the schema of a model or collection 
    Full_Name : { type: String, required: true },
    contact_no : Number,
    address : String,
    email_add : String,
    department : String,
    gender : String
});


const Employee=mongoose.model("employee",userschema)  //creating a collection of name employee with the userschema strcture
                                                    
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/add', async(req, res) => {       //post request to recive data from frontend and save it is in database

    try {
        const new_employee=new Employee(req.body);   //req.body carry the data
        await new_employee.save();
        res.send("employee saved");
        console.log("Received data:", req.body);
        
    } catch (error) {
        console.error("❌ Backend error:", error);  // show full error in terminal
        res.status(500).send("❌ Error occurred while saving employee: " + error.message);
    }

  });

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })