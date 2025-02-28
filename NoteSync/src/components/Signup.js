import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../images/signup.png"

const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"" , password:"",cpassword:""})
    let navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}), 
    });
    const json=await response.json()
    console.log(json)
    if(json.success){
         localStorage.setItem('token',json.authToken);
         navigate("/");
         props.showAlert("Account Created Successfully","success")

    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
}

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    
    <div className="container">
    <div className="row">
    <div class="col-sm-6">
  <img className='img-fluid' src={background} alt="book"  />
  </div>
    <div class="col-sm-4" style={{"borderRadius":"1rem","backgroundColor": "#2B2A4C"}}>
    <div className="mb-md-5 mt-md-4 pb-5 text-center">
      <h2 class="fw-bold mb-2 text-uppercase text-center text-light">SIGNUP</h2>
      <p class="text-white-50 mb-5 text-center">Please create your account!</p>
      <form onSubmit={handleSubmit}>
          <div className="form-outline form-white mb-4 mx-4">
            <input type="text" className="form-control form-control-lg" id="name" name="name" value={credentials.name} onChange={onChange}  
            placeholder="Enter Name"
            aria-describedby="emailHelp"/>
            <label htmlFor="name" className="form-label text-light">Name</label>

          </div>
          <div className="form-outline form-white mb-4 mx-4">
            <input type="email" className="form-control form-control-lg " id="email" name="email" value={credentials.email} onChange={onChange} placeholder="Enter Email" aria-describedby="emailHelp"/>
            <label htmlFor="email" className="form-label text-light">Email </label>
          </div>
          <div className="form-outline form-white mb-4 mx-4">
            <input type="password" className="form-control form-control-lg" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Enter password" minLength={8} required/>
            <label htmlFor="password" className="form-label text-light">Password</label>

          </div>

          
          <button type="submit" className="btn btn-outline-light btn-lg px-5">SignUp</button>
        </form>
    </div>
    </div>
    </div>
    </div>
    
  )
}

export default Signup
