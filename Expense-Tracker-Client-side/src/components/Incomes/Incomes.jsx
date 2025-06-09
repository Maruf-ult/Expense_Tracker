
import { useEffect, useState } from "react";
import Addedincomes from "./Addedincomes";
import toast from "react-hot-toast";

const Incomes = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomeStoredData, setIncomeStoredData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isInputEditable, setIsInputEditable] = useState(false);

  // Retrieve the login ID from localStorage
  const userId = localStorage.getItem("userId");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "Add category") {
      setInputValue("");
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
    if (inputValue === "") {
      return;
    }

    const newIncome = {
      userId, 
      source: selectedOption,
      title: inputValue,
      amount,
      date,
    };

    try {
      const response = await fetch("https://expense-tracker-2-bn31.onrender.com/add-income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      });
      const result = await response.json();
      console.log(result);
      if (!result._id) {
        toast.error("An error occurred");
      } else {
        setIncomeStoredData([
          ...incomeStoredData,
          { ...newIncome, _id: result._id },
        ]);
        setInputValue("");
        setSelectedOption("");
        setAmount("");
        setDate("");
        setIsInputEditable(false);
        toast.success("Income added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`https://expense-tracker-2-bn31.onrender.com/income/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setIncomeStoredData(
          incomeStoredData.filter((income) => income._id !== id)
        );
        toast.success("Income deleted successfully");
      } else {
      
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("https://expense-tracker-2-bn31.onrender.com/add-income?userId=" + userId)
      .then((res) => res.json())
      .then((data) => {
        setIncomeStoredData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const incomeTotal = incomeStoredData.reduce(
      (total, income) => total + parseInt(income.amount),
      0
    );
    setTotalIncome(incomeTotal);
  }, [incomeStoredData]);

return (
  <div className="min-h-[89vh] -mt-3 bg-emerald-500 p-4 rounded-s-3xl max-w-screen-lg mx-auto">
    <p className="text-3xl text-center font-bold mt-2">Incomes</p>

    {/* Total Incomes */}
    <div className="flex justify-center mt-4">
      <div className="bg-white p-3 rounded-xl w-full max-w-md">
        <p className="text-center font-bold text-lg">
          Total Incomes: <span className="text-green-500 font-bold">{totalIncome} Tk</span>
        </p>
      </div>
    </div>

    {/* Form & Income List */}
    <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
      
      {/* Income Form */}
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
            <option value="Teaching">Teaching</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Stocks">Stocks</option>
            <option value="Youtubing">Youtubing</option>
            <option value="Marketing">Marketing</option>
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
            Save Income
          </button>
        </div>
      </form>

      {/* Income List */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-2 rounded-xl mb-3">
          <p className="text-center font-bold">Income Details</p>
        </div>
        <ul>
          {incomeStoredData.map((income, index) => (
            <Addedincomes key={index} income={income} deleteIncome={handleDeleteIncome} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);
};

export default Incomes;
