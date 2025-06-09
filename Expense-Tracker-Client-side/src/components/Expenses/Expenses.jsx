import { useEffect, useState } from "react";
import Addedexpense from "./Addedexpense";
import toast from "react-hot-toast";

const Expenses = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenseStoredData, setExpenseStoredData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isInputEditable, setIsInputEditable] = useState(false);
  const userId = localStorage.getItem('userId');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value === 'Add category') {
      setInputValue('');
      setIsInputEditable(true);
    } else {
      setInputValue(value);
      setIsInputEditable(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue === '') {
      alert('Please fill out this field');
      return;
    }

    const newExpense = {
      userId,
      source: selectedOption,
      title: inputValue,
      amount,
      date
    };

    try {
      const response = await fetch('https://expense-tracker-2-bn31.onrender.com/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      });
      const result = await response.json();
      console.log(result);
      if (!result._id) {
        // alert('An error occurred');
        toast.error("An error occured")
      } else {
        setExpenseStoredData([...expenseStoredData, { ...newExpense, _id: result._id }]);
        setInputValue('');
        setSelectedOption('');
        setAmount('');
        setDate('');
        setIsInputEditable(false);
        toast.success("Expense added successfully");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`https://expense-tracker-2-bn31.onrender.com/expense/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExpenseStoredData(expenseStoredData.filter(expense => expense._id !== id));
        toast.success("Expense deleted successfully");
      } else {
        const result = await response.json();
        toast.error(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
  <div className="min-h-[85vh] bg-rose-400 p-3 rounded-s-3xl">
    <p className="text-2xl text-center font-bold mt-2">Expenses</p>

    {/* Total Expenses */}
    <div className="flex justify-center mt-3">
      <div className="bg-white p-2 rounded-xl w-full max-w-md">
        <p className="text-center font-bold text-lg">
          Total Expenses: <span className="text-rose-500 font-bold">{totalExpense} Tk</span>
        </p>
      </div>
    </div>

    {/* Form & Expense List */}
    <div className="flex flex-col md:flex-row justify-center gap-3 mt-3">
      
      {/* Expense Form */}
      <form className="flex-1 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            className="input input-bordered w-full"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Source name"
            disabled={!isInputEditable}
            required
          />
          <select className="p-2 w-full mt-2" value={selectedOption} onChange={handleSelectChange} required>
            <option value="">Select category</option>
            <option value="Add category">Add category</option>
            <option value="Education">Education</option>
            <option value="Groceries">Groceries</option>
            <option value="Health">Health</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Traveling">Traveling</option>
          </select>
        </div>

        <div className="mt-3">
          <label>Amount:</label><br />
          <input
            className="input input-bordered w-full"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        <div className="mt-3">
          <label>Date:</label><br />
          <input
            className="input input-bordered w-full"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="flex justify-center mt-3">
          <button className="btn btn-secondary w-full max-w-xs" type="submit">
            Save Expense
          </button>
        </div>
      </form>

      {/* Expense List */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-2 rounded-xl mb-3">
          <p className="text-center font-bold">Expense Details</p>
        </div>
        <ul>
          {expenseStoredData.map((expense, index) => (
            <Addedexpense key={index} expense={expense} handleDelete={handleDeleteExpense} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}

export default Expenses;
