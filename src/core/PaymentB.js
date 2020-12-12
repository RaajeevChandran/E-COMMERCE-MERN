import React,{useState,useEffect} from 'react'
import { loadCart, cartEmpty } from './helper/CartHelper'
import { Link } from 'react-router-dom'
import { getmeToken, processPayment } from '../admin/helper/paypalHelper'
import { createOrder } from './OrderHelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react"

export default function PaypalPayment({products,setReload = f => f,reload=undefined}) {
    const [info, setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId,token) => {
        getmeToken(userId,token).then(info => {
            console.log("INFORMATION",info)
            
            if(info.error){
                setInfo({...info,error:info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId,token)
    }, [])
    
    return (
        <div>
            <h3>Test Paypal</h3>
        </div>
    )
}
