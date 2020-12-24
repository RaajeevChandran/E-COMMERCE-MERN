import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {signup} from "../auth/helper"
import { firebaseAnalytics } from '../firebaseConfig'

export default function Signup(){

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    useEffect(() => {
       firebaseAnalytics.logEvent('visited_sign_up')
    }, [])
    const {name,email,password,error,success} = values

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
        .catch(console.log("Error in signup"))
    }



    const signUpform = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} value={name} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} value={email} type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} value={password} type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
const successMessage = () =>{
    return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                    New account was created successfully. Please {" "} <Link to="/signin">Login Here</Link>
                    </div>
            </div>
    </div>
    )
}

const errorMessage = () =>{
    return (
        <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
        </div>
        )
}
    return (
        <Base 
        title="Sign up page"
        description="A page for user to sign up!">
        {successMessage()}
        {errorMessage()}
        {signUpform()}
    {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}