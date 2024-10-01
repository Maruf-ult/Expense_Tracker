
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.value;

    const loginUser = { name, email, password };
    console.log(loginUser);
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/login");
        if (data._id) {
        
          alert("Resgistered Successfully")
          form.reset();
        }
      });
  };

  return (
    <>
      <div className=" min-h-screen bg-red-100	background-color: rgb(254 226 226);">
        <div className=" hero hero-content flex-col ">
          <div className="text-center lg:text-left">
            <p className="py-2 text-violet-500 font-sans text-3xl">
              Expense Tracker
            </p>
            <h1 className="text-2xl font-bold">Registration Please</h1>
            
          </div>
          <div className="flex gap-8 flex-row ">
            <div className=" shrink-0 w-full max-w-sm ">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="your name"
                    className="input input-bordered"
                    required
                  />

                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                  <button className="w-full bg-violet-600 text-white p-2">
                    Sign Up
                  </button>
                </div>
                <div className="form-control mt-6">
                  <p >Already have an account?
                    <Link className="text-violet-700 font-bold" to="/login">Login
                  </Link></p>
                </div>
              </form>
            </div>
               {/* <img src={img} alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
