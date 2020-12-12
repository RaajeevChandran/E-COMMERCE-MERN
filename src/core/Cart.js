import React,{useState,useEffect} from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/CartHelper'
import StripeCheckout from './StripeCheckout'




export default function Cart() {
   
    const [products,setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    
    
    const loadAllProducts = () =>{
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product,index)=>{
                   return ( <Card 
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                    />)
                })}
            </div>
        )
    }

    // const loadCheckout = () =>{
    //     return (
    //         <div>
    //             <h2>This section is for checkout</h2>
    //         </div>
    //     )
    // }
    

    return (
        <Base title="Cart page" description="Ready to checkout">
            <div className="row">
               <div class="col-6">{loadAllProducts()}</div>
                <div class="col-6"><StripeCheckout products={products} setReload={setReload}/></div>
            </div>
        </Base>
    )
}
