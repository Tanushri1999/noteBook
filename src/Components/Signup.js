import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");

    }
    else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1>Create an account to use myNoteBook - SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input type="text" onChange={onChange} id="name" value={credentials.name} name='name' className="form-control" />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="email">Email address</label>
          <input type="email" onChange={onChange} id="email" value={credentials.email} name='email' className="form-control" />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input type="password" onChange={onChange} value={credentials.password} id="password" name='password' className="form-control" minLength={8} required/>
        </div>
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="password">Confirm Password</label>
          <input type="password" onChange={onChange} value={credentials.cpassword} id="cpassword" name='cpassword' className="form-control" minLength={8} required/>
        </div>

        <button type="submit" className="btn btn-success">Sign Up</button>

      </form>
    </div>
  )
}

export default Signup
