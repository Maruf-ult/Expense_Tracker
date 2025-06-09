import { Outlet } from "react-router-dom";
import Headers from "../Headers/Headers";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar (Sticky instead of Fixed) */}
      <div className="md:w-64 w-full ">
        <Headers />
      </div>

      {/* Main Content - Adjusted for mobile */}
      <div className="flex-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};


export default Home;