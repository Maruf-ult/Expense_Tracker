import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import image from "../assests/images/Auditing Accounts.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = { name, email, password };

    fetch("https://expense-tracker-2-bn31.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data._id) {
          toast.success("Registered Successfully");
          navigate("/login");
        }
      });
  };

return (
  <div className="h-screen flex items-center justify-center bg-red-100">
    <div className="flex flex-col lg:flex-row bg-slate-300 rounded-lg shadow-lg overflow-hidden max-w-3xl w-full">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center p-6">
        <img src={image} alt="Auditing Accounts" className="w-full h-auto object-cover" />
      </div>

      {/* Right Side - Sign-Up Form */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
        <div className="text-center">
          <p className="py-2 text-violet-500 text-3xl font-sans">Expense Tracker</p>
          <h1 className="text-4xl font-bold">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="input input-bordered px-2 w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="input input-bordered px-2 w-full"
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
              placeholder="Password"
              className="input input-bordered px-2 w-full"
              required
            />
          </div>
          <div className="form-control mt-5">
            <button className="w-full bg-violet-600 text-white p-2">Sign Up</button>
          </div>
          <div className="text-center">
            <p>Already have an account? <Link className="text-orange-600" to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default SignUp;