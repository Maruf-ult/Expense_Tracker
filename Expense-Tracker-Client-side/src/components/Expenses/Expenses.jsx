import { useEffect, useState } from "react";
import Addedexpense from "./Addedexpense";

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
      const response = await fetch('http://localhost:5000/add-expense', {
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
      } else {
        setExpenseStoredData([...expenseStoredData, { ...newExpense, _id: result._id }]);
        setInputValue('');
        setSelectedOption('');
        setAmount('');
        setDate('');
        setIsInputEditable(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/expense/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExpenseStoredData(expenseStoredData.filter(expense => expense._id !== id));
      } else {
        const result = await response.json();
        alert(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  return (
    <div className="min-w-[1080px] min-h-screen bg-rose-100">
      <p className="text-3xl text-center font-bold mr-12 mt-4">Expenses</p>
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-xl w-96 my-12">
          <p className="text-center font-bold text-xl">
            Total Expenses: <span className="text-rose-500 font-bold">{totalExpense} Tk</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-evenly ml-16">
        <form className="flex-1" onSubmit={handleSubmit}>
          <div>
            <label>Title:</label><br />
            <input
              className="input input-bordered input-primary w-34 max-w-xs"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Source name"
              disabled={!isInputEditable}
              required
            />
            <select className="p-3" value={selectedOption} onChange={handleSelectChange} required>
              <option value="">Select category</option>
              <option value="Add category">Add category</option>
              <option value="Education">Education</option>
              <option value="Groceries">Groceries</option>
              <option value="Health">Health</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Traveling">Traveling</option>
             
            </select>
          </div><br />
          <div>
            <label>Amount:</label><br />
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div><br />
          <div>
            <label>Date:</label><br />
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div><br />
          <div className="flex justify-center mr-28">
            <button className="btn btn-secondary my-4" type="submit">Save Expense</button>
          </div>
        </form>
        <div className="mr-16 flex-1">
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-xl mb-4 w-96">
              <p className="text-center font-bold">Expense Details</p>
            </div>
          </div>
          <ul>
            {expenseStoredData.map((expense, index) => (
              <Addedexpense
                key={index}
                expense={expense}
                handleDelete={handleDeleteExpense}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
