import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background from "../images/login.png"
const Login = (props) => {
    const [credentials,setCredentials]=useState({email:"" , password:""})
    let navigate= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}), 
        });
        const json=await response.json()
        console.log(json)
        if(json.success){
             localStorage.setItem('token',json.authToken);
             props.showAlert("Logged in Successfully","success");
             navigate("/");
        }
        else{
          props.showAlert("Login Failed","danger")
        }
    }
    
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
  return (
    <div>
    <div className="container" >
    <div className="container" >
      <div className="row">
      <div class="col-sm-7"  >
        <div className='container' >
  <img className='img-fluid' src={background} alt="book"  />
  </div>
  </div>
    <div class=" col-sm-4 " style={{"borderRadius": "1rem","backgroundColor": " #2B2A4C"}}>
    <div class="mb-md-5 mt-md-4 pb-5 text-center" >
      <h2 class="fw-bold mb-2 text-uppercase text-center text-light ">LOGIN</h2>
      <p class="text-white-50 mb-5 text-center">Please enter your Email and password!</p>
      <form onSubmit={handleSubmit}>
        <div class="form-outline form-white mb-4 mx-4">
            <label htmlFor="email" className="form-label text-light">Email address</label>
            <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
        </div>
        <div class="form-outline form-white mb-4 mx-4" style={{"marginTop": "40px"}}>
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="password" />
        </div>
        <div>
        <button type="submit" className="btn btn-outline-light btn-lg px-5" style={{"marginTop": "40px"}}>Login</button>
        </div>
        <div>
          <p className="mb-0 text-light" style={{"marginTop": "30px"}} >Don't have an account? 
          <a class=" fw-bold" href="/signup">Sign Up</a> </p>
        </div>
        </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    
  )
}

export default Login
