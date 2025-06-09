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
      window.location.href = "https://expense-tracker-3-ejs5.onrender.com";
    }
  };

  return (
    <div className="w-full h-full md:w-64 p-4 bg-gradient-to-r from-rose-200 to-rose-100 rounded-e-3xl shadow-lg sticky top-0">
      {/* Welcome Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-violet-700">
          Welcome, <span className="text-pink-600">{profileName}!</span>
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-3 items-center w-full">
        {[
          { icon: <FcBullish />, text: "View Transactions", link: "/home/transaction" },
          { icon: <FcBriefcase />, text: "Incomes", link: "/home/incomes" },
          { icon: <FcLeave />, text: "Expenses", link: "/home/expenses" },
          { icon: <FcAlphabeticalSortingZa />, text: "Summary", link: "/home/summary" }
        ].map(({ icon, text, link }, index) => (
          <div key={index} className="flex gap-3 items-center w-full">
            <div className="text-4xl">{icon}</div>
            <button className="text-lg text-violet-700 hover:text-violet-500 hover:bg-rose-300 px-3 py-2 rounded w-full">
              <Link to={link}>{text}</Link>
            </button>
          </div>
        ))}

        {/* Logout Button */}
        <div className="flex gap-3 items-center w-full mt-2">
          <button
            onClick={handleLogout}
            className="text-lg font-bold text-red-500 hover:text-red-700 hover:bg-gray-100 px-3 py-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Headers;
