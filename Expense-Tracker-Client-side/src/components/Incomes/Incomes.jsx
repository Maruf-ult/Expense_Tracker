
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
    <div className="min-w-[1300px] min-h-screen bg-emerald-500  pr-14 mt-2 rounded-s-3xl">
      <p className="text-3xl text-center font-bold mr-12 mt-2">Incomes</p>
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-xl w-96 my-9">
          <p className="text-center font-bold text-xl">
            Total Incomes:{" "}
            <span className="text-green-500 font-bold">{totalIncome} Tk</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-evenly ml-16   ">
        <form className="flex-1  " onSubmit={handleSubmit}>
          <div >
            <label>Title:</label>
            <br />
            <input
              className="input input-bordered input-primary w-40   "
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Source name"
              disabled={!isInputEditable}
              required
            />
            <select
              className="p-3"
              value={selectedOption}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select category</option>
              <option value="Add category">Add category</option>
              <option value="Teaching">Teaching</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Stocks">Stocks</option>
              <option value="Youtubing">Youtubing</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <br />
          <div>
            <label>Amount:</label>
            <br />
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Date:</label>
            <br />
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <br />
          <div className="flex justify-center mr-28 ">
            <button className="btn btn-secondary my-2 " type="submit">
              Save Income
            </button>
          </div>
        </form>
        <div className="mr-16 flex-1">
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-xl mb-4 w-96 mt-5">
              <p className="text-center font-bold ">Incomes Details</p>
            </div>
          </div>
          <ul>
            {incomeStoredData.map((income, index) => (
              <Addedincomes
                key={index}
                income={income}
                deleteIncome={handleDeleteIncome}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
