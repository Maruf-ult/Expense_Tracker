import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import image from "/assests/images/Auditing Accounts.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = { email, password };

    fetch('https://expense-tracker-2-bn31.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginUser)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          toast.success(`Welcome ${result.name}!!`);
          localStorage.setItem('userId', result.userId);
          localStorage.setItem('profileName', result.name);
          navigate('/home');
        } else {
          toast.error("Incorrect password or email");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-red-100 p-10">
      <div className="flex flex-col lg:flex-row bg-slate-300 rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 hidden lg:flex items-center justify-center p-8">
          <img src={image} alt="Auditing Accounts" className="w-full h-auto object-cover" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center">
            <p className="py-2 text-violet-500 text-3xl font-sans">Expense Tracker</p>
            <h1 className="text-5xl font-bold">Login now</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="input input-bordered px-2 w-full"
                required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="input input-bordered px-2 w-full"
                required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="w-full bg-violet-600 text-white p-2">Login</button>
            </div>
            <div className="text-center">
              <p>New user? <Link className="text-orange-600" to="/signup">Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;