import { useEffect, useState } from "react";

const Summary=()=>{
  const [incomeStoredData, setIncomeStoredData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenseStoredData, setExpenseStoredData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    fetch('http://localhost:5000/add-income?userId=' + userId)
    .then(res => res.json())
    .then(data => {
      setIncomeStoredData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    const incomeTotal = incomeStoredData.reduce((total, income) => total + parseInt(income.amount), 0);
    setTotalIncome(incomeTotal);
  }, [incomeStoredData]);


  console.log(incomeStoredData)



  useEffect(() => {
    fetch('http://localhost:5000/add-expense?userId=' + userId)
    .then(res => res.json())
    .then(data => {
      setExpenseStoredData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    const expenseTotal = expenseStoredData.reduce((total, expense) => total + parseInt(expense.amount), 0);
    setTotalExpense(expenseTotal);
  }, [expenseStoredData]);

    return(
      <>





        <div className="min-w-[980px]  min-h-screen bg-rose-100">
          <div className="flex flex-row justify-evenly  p-5">
            <div>
            <div className="bg-white p-4 rounded-full text-center mb-4">
           <p className="text-xl font-bold">income summary </p>
           </div>
           <div>
            {
              incomeStoredData.map((income,index)=>(
                <div  className="bg-green-400 p-3 rounded-xl mb-4 w-96 "  key={index}>
                <p className="font-bold"> {income.title} <span className="ml-4 mr-1"> {income.amount}</span>Tk</p>
                <p className="font-bold">{income.date.split("T")[0]}</p>
                
                </div>
              ))
              
            }
            
            </div>
            <div className="bg-white p-4 rounded-full text-center mb-4">
           <p className="text-xl font-bold">Total Incomes: <span className="text-green-600 font-bold">{totalIncome}</span> Tk</p>
           </div>
            </div>
            
            <div>
            <div className="bg-white p-4 rounded-full text-center mb-4">
              <p className="text-xl font-bold">Expense summary</p>
              </div>
              <div>
              {
            expenseStoredData.map((expense,index)=>(
              <div className="bg-red-400 p-3 rounded-xl mb-4 w-96 "   key={index}>
               <p className="font-bold"> {expense.title} <span className="ml-4 mr-1"> {expense.amount}</span>Tk</p>
  
              <p className="font-bold">{expense.date.split("T")[0]}</p> 
              </div>
            ))
          }
          </div>

          <div className="bg-white p-4 rounded-full text-center mb-4">
           <p className="text-xl font-bold">Total Expenses: <span className="text-red-600 font-bold">{totalExpense}</span> Tk</p>
           </div>
            
            </div>

        </div>
        </div>
      </>
    )
  
  
  }
  export default Summary;



