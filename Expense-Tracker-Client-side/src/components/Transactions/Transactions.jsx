
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Transactions = () => {
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

  const netIncome = totalIncome - totalExpense;

  // Prepare data for the line chart
  const dates = incomeStoredData.map(income => income.date.split('T')[0]); // Extract the date part
  const incomeAmounts = incomeStoredData.map(income => parseInt(income.amount));
  const expenseAmounts = expenseStoredData.map(expense => parseInt(expense.amount));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'income',
        data: incomeAmounts,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        fill: true,
      },
      {
        label: 'Expense',
        data: expenseAmounts,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        fill: true,
      },
      {
        label: 'Cumulative Income',
        data: new Array(dates.length).fill(totalIncome),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: 'Cumulative Expense',
        data: new Array(dates.length).fill(totalExpense),
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.3)',
        fill: false,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (Tk)',
        },
        beginAtZero: true,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expense Over Time',
      },
    },
  };

return (
  <div className="min-h-[89vh] -mt-3 bg-cyan-600 flex flex-col items-center p-3 rounded-s-3xl" >
    
    {/* Chart Container */}
    <div className="bg-white p-3 rounded-xl w-full max-w-2xl">
      <Line data={data} options={options} />
    </div>

    {/* Income and Expense Summary */}
    <div className="flex flex-col md:flex-row gap-3 mt-4 w-full max-w-lg">
      
      {/* Total Income */}
      <div className="bg-white p-3 rounded-xl w-full text-center">
        <p className="font-bold text-lg">
          Total Income: <span className="text-green-500 font-bold">{totalIncome} Tk</span>
        </p>
      </div>

      {/* Total Expenses */}
      <div className="bg-white p-3 rounded-xl w-full text-center">
        <p className="font-bold text-lg">
          Total Expenses: <span className="text-red-500 font-bold">{totalExpense} Tk</span>
        </p>
      </div>
    </div>

    {/* Net Income Box */}
    <div className="bg-white p-3 rounded-xl w-full max-w-sm mt-3 text-center">
      <p className="font-bold text-lg">
        Net Income: <span className="text-green-500 font-bold">{netIncome} Tk</span>
      </p>
    </div>

  </div>
);
}

export default Transactions;

