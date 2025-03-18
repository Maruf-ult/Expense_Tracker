import { Outlet } from "react-router-dom";
import Headers from "../Headers/Headers";

const Home=()=>{


  return(
    <>
    <div className="flex flex-row gap-8 max-w-screen-2xl">
      <Headers></Headers>
      <Outlet></Outlet>
</div>
    </>
  )


}
export default Home;
