import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



    return (
        <div>
            <h1>LogIn</h1>
            <form  onSubmit={handleSubmit}>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" onChange={onChange} id="email" value={credentials.email} name='email' className="form-control" />
                </div>

                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} id="password" name='password' className="form-control" />
                </div>

                <button type="submit" className="btn btn-success">LogIn</button>

            </form>
        </div>
    )
}

export default Login
