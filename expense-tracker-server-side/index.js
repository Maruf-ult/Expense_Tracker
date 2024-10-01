// const express = require('express')
// const mongoose = require('mongoose')
// const cors= require('cors')
// const userInformation = require('./models/userInfo')
// const incomeSchema=require('./models/incomeModel')
// const expenseSchema=require('./models/expensModel')
// const app = express();
// const port= process.env.PORT ||5000;


// // middleware
// app.use(express.json());
// app.use(cors());


// mongoose.connect("mongodb://127.0.0.1:27017/employee");
// // Login information section
 
// app.get('/register',async(req,res)=>{
//    try{
//     const loginInfo=await userInformation.find();
//     res.json(loginInfo)
//    }
//    catch(err)
//    {
//     res.status(500).json({message:err.message});
//    }
// })
// app.post('/register',(req,res)=>{
//   userInformation.create(req.body)
//   .then(employee => res.json(employee))
//   .catch(err => res.json(err))
// })
// app.post('/login',(req,res)=>{
//    const {email,password}=req.body;
//     userInformation.findOne({email: email})
//     .then(user=>{
//         if(user){
//             if(user.password===password){
//                 res.json("success")
                
//             }
//             else{
//                 res.json("inccorect password")
//             }
//         }
//         else{
//             res.json("record Not found")
//         }
//     })
// })
// // incomedata

// app.get('/add-income',async(req,res)=>{
//     try{
//         const incomeInfo=await incomeSchema.find();
//         res.json(incomeInfo)
//        }
//        catch(err)
//        {
//         res.status(400).json({message:err.message});
//        }
// })
    


//   app.post('/add-income',async(req,res)=>{
  
//     incomeSchema.create(req.body)
//     .then(employee => res.json(employee))
//     .catch(err => res.json(err))
//   })
// // income Delete




// //   expense data


  
// app.get('/add-expense',async(req,res)=>{
//     try{
//         const expenseInfo=await expenseSchema.find();
//         res.json(expenseInfo)
//        }
//        catch(err)
//        {
//         res.status(400).json({message:err.message});
//        }
// })
    


//   app.post('/add-expense',async(req,res)=>{
  
//     expenseSchema.create(req.body)
//     .then(employee => res.json(employee))
//     .catch(err => res.json(err))
//   })



 
// app.get('/',(req,res)=>{
//     res.send("simple server is running");
// })

// // 


// app.listen(port,()=>{
//     console.log(`simple server is listening on ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userInformation = require('./models/userInfo');
const incomeSchema = require('./models/incomeModel');
const expenseSchema = require('./models/expensModel');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.get('/register', async (req, res) => {
  try {
    const loginInfo = await userInformation.find();
    res.json(loginInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/register', (req, res) => {
  userInformation.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err));
});



app.post('/login', (req, res) => {
  const { email, password } = req.body;
  userInformation.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ success: true, userId: user._id });  // Include user ID in the response
        } else {
          res.json({ success: false, message: "Incorrect password" });
        }
      } else {
        res.json({ success: false, message: "Record not found" });
      }
    })
    .catch(err => res.status(500).json({ success: false, message: err.message }));
});


// Income data
app.get('/add-income', async (req, res) => {
  try {
    console.log(req.query)
    if(req.query.userId){
      const incomeInfo = await incomeSchema.find({userId:req.query.userId});
      res.json(incomeInfo);
    }
    else{
      const incomeInfo = await incomeSchema.find();
      res.json(incomeInfo);
    }
   
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/add-income', async (req, res) => {
  incomeSchema.create(req.body)
    .then(income => res.json(income))
    .catch(err => res.json(err));
});

// Income Delete
app.delete('/income/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await incomeSchema.findByIdAndDelete(id);
    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted', data: deletedIncome });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Expense data
app.get('/add-expense', async (req, res) => {
  try {
    if(req.query.userId){
      const expenseInfo = await expenseSchema.find({userId:req.query.userId});
      res.json(expenseInfo);
    }
    else{
      const expenseInfo = await expenseSchema.find();
      res.json(expenseInfo);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/add-expense', async (req, res) => {
  expenseSchema.create(req.body)
    .then(expense => res.json(expense))
    .catch(err => res.json(err));
});

// expense delete

 // Expense Delete
app.delete('/expense/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await expenseSchema.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted', data: deletedExpense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/', (req, res) => {
  res.send("simple server is running");
});

app.listen(port, () => {
  console.log(`simple server is listening on ${port}`);
});
