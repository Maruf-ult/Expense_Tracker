import { useEffect, useState } from "react";

const Summary=()=>{
  const [incomeStoredData, setIncomeStoredData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenseStoredData, setExpenseStoredData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    fetch('https://expense-tracker-2-bn31.onrender.com/add-income?userId=' + userId)
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
    fetch('https://expense-tracker-2-bn31.onrender.com/add-expense?userId=' + userId)
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

return (
  <div className="min-h-[90vh] -mt-3 bg-slate-400 p-4 rounded-s-3xl max-w-screen-lg mx-auto">
    <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
      
      {/* Income Summary */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-3 rounded-xl text-center mb-3">
          <p className="text-xl font-bold">Income Summary</p>
        </div>
        <div>
          {incomeStoredData.map((income, index) => (
            <div className="bg-green-400 p-3 rounded-xl mb-3 w-full" key={index}>
              <p className="font-bold">{income.title} <span className="ml-4 mr-1">{income.amount}</span> Tk</p>
              <p className="font-bold">{income.date.split("T")[0]}</p>
            </div>
          ))}
        </div>
        <div className="bg-zinc-50 p-3 rounded-xl text-center mb-3">
          <p className="text-xl font-bold">Total Income: <span className="text-green-600 font-bold">{totalIncome}</span> Tk</p>
        </div>
      </div>

      {/* Expense Summary */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-3 rounded-xl text-center mb-3">
          <p className="text-xl font-bold">Expense Summary</p>
        </div>
        <div>
          {expenseStoredData.map((expense, index) => (
            <div className="bg-red-400 p-3 rounded-xl mb-3 w-full" key={index}>
              <p className="font-bold">{expense.title} <span className="ml-4 mr-1">{expense.amount}</span> Tk</p>
              <p className="font-bold">{expense.date.split("T")[0]}</p>
            </div>
          ))}
        </div>
        <div className="bg-zinc-50 p-3 rounded-xl text-center mb-3">
          <p className="text-xl font-bold">Total Expenses: <span className="text-red-600 font-bold">{totalExpense}</span> Tk</p>
        </div>
      </div>
    </div>
  </div>
);
  
  
  }
  export default Summary;



