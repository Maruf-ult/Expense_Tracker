
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = { email, password };
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginUser)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);

        if (result.success) {
          // Assuming the result contains user ID in `result.userId`
          localStorage.setItem('userId', result.userId);
          navigate('/home');
        } else {
          alert("Incorrect password");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="min-h-screen bg-red-100 background-color: rgb(254 226 226);">
        <div className="hero hero-content flex-col">
          <div className="text-center lg:text-left">
            <p className="py-2 text-violet-500 font-sans text-3xl">Expense Tracker</p>
            <h1 className="text-5xl font-bold">Login now</h1>
          
          </div>
          <div className="flex gap-8 flex-col">
            <div className="shrink-0 w-full max-w-sm">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
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
      </div>
    </>
  );
}

export default Login;
