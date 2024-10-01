import {
  FcAlphabeticalSortingZa,
  FcBriefcase,
  FcBullish,
  FcLeave,
} from "react-icons/fc";
import { Link } from "react-router-dom";

const Headers = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="min-w-72  min-h-screen  shadow-xl  bg-gradient-to-r from-rose-200 to-rose-100">
        <div className="grid grid-rows-5 gap-8 mt-32 justify-center">
          <div className="flex gap-2 items-center">
            <div className="text-bold text-6xl">
              <FcBullish />
            </div>
            <button className="text-xl text-violet-700 ">
              <Link to="/home/transaction">view Transactions</Link>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-bold text-6xl">
              <FcBriefcase />
            </div>
            <button className="text-xl text-violet-700 ">
              <Link to="/home/incomes">Incomes</Link>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-bold text-6xl">
              <FcLeave />
            </div>
            <button className="text-xl text-violet-700 ">
              <Link to="/home/expenses">Expenses</Link>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-bold text-6xl">
              <FcAlphabeticalSortingZa />
            </div>
            <button className="text-xl text-violet-700 ">
              {" "}
              <Link to="/home/summary">Summary</Link>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            {/* <div className="text-bold text-6xl"><FcAlphabeticalSortingZa /></div> */}
            <button
              onClick={() => handleLogout()}
              className="text-xl text-violet-700 "
            >
              {" "}
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Headers;
