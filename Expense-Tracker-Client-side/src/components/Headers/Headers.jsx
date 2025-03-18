import {
  FcAlphabeticalSortingZa,
  FcBriefcase,
  FcBullish,
  FcLeave,
} from "react-icons/fc";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Headers = () => {
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("profileName");
    setProfileName(storedName || "User");
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      localStorage.removeItem("profileName");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="min-w-72 mt-2 bg-gradient-to-r from-rose-200 to-rose-100 rounded-e-3xl">
        <div className="grid grid-rows-5 gap-8 mt-6 justify-center">
   
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-violet-700">
              Welcome, <span className="text-pink-600">{profileName}!</span>
            </h1>
          </div>

          <div className="flex gap-2 items-center group">
            <div className="text-bold text-6xl">
              <FcBullish />
            </div>
            <button className="text-xl text-violet-700 hover:text-violet-500 hover:bg-rose-200 px-3 py-1 rounded transition duration-300 group-hover:scale-105">
              <Link to="/home/transaction">View Transactions</Link>
            </button>
          </div>

    
          <div className="flex gap-2 items-center group">
            <div className="text-bold text-6xl">
              <FcBriefcase />
            </div>
            <button className="text-xl text-violet-700 hover:text-teal-500 hover:bg-rose-200 px-3 py-1 rounded transition duration-300 group-hover:scale-105">
              <Link to="/home/incomes">Incomes</Link>
            </button>
          </div>

        
          <div className="flex gap-2 items-center group">
            <div className="text-bold text-6xl">
              <FcLeave />
            </div>
            <button className="text-xl text-violet-700 hover:text-red-500 hover:bg-rose-200 px-3 py-1 rounded transition duration-300 group-hover:scale-105">
              <Link to="/home/expenses">Expenses</Link>
            </button>
          </div>

         
          <div className="flex gap-2 items-center group">
            <div className="text-bold text-6xl">
              <FcAlphabeticalSortingZa />
            </div>
            <button className="text-xl text-violet-700 hover:text-green-500 hover:bg-rose-200 px-3 py-1 rounded transition duration-300 group-hover:scale-105">
              <Link to="/home/summary">Summary</Link>
            </button>
          </div>

        
          <div className="flex gap-2 items-center group">
            <button
              onClick={() => handleLogout()}
              className="text-xl font-bold text-red-500 hover:text-red-700 hover:bg-gray-100 px-3 py-1 rounded transition duration-300 group-hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
