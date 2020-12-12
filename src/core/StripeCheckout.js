import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/CartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import {createOrder} from "../core/OrderHelper"

export default function StripeCheckout({products,setReload = f => f,reload=undefined}) {
   
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
   
    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id
   
   const getFinalAmount = () => {
            let amount = 0
            products.map(p=>{
                amount= amount + p.price
            })
            return amount
   }

   const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response => {
            console.log(response)
            cartEmpty()
            
        }).catch(err => console.log(err))
        
   }

   const showStripeButton = () => {
       return isAuthenticated() ? ( 
           <StripeCheckoutButton
           stripeKey="pk_test_51Gt5IgJMyjFak4MYQUzpkFytM3ZOwpk5FF9VxVHgtqtZYP0lYSVnqb8PURYwwJ5EuO4pTE0pzzSm8j4b2clem8yi00Vam3gdh5"
           token={makePayment}
           amount={getFinalAmount() * 100}
           name="Buy T-Shirts"
           shippingAddress
           billingAddress
           >
                <button className="btn btn-success">Pay with stripe</button> 
           </StripeCheckoutButton>
          
       ) : (
           <Link to="/signin">
               <button className="btn btn-warning">Sign in</button>
           </Link>
       )
   }

   
   
    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}
