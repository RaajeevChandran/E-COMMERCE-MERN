import React,{useState,useEffect} from 'react'
import ImageHelper from '../admin/helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

export default function Card
(
  {
    product,
  addToCart = true,
  removeFromCart=false,
  setReload=f => f,
  function(f){return f}
  reload=undefined
}
) {
   
  const [redirect, setRedirect] = useState(false)
  const [count,setCount] = useState(product.count)


  const cardTitle = product ? product.name : "A photo from pexels"
  const cardDescription = product ? product.description : "Default description"
  const cardPrice = product ? product.price : "0"
  
  const addtoCart =() =>{
    addItemToCart(product,()=>setRedirect(true))
  }

  const getRedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart" />
    }
  }
  
  const showAddToCart = addToCart => {
        return (
          addToCart && (
            <button
                    onClick={addtoCart}
                    className="btn"
                  >
                    Add to Cart
                  </button>
          )
        )
    }
    // console.log(product['name'])
    const showRemoveFromCart = removeFromCart => {
      return (
        removeFromCart && (
          <button
                    onClick={() => {
                      removeItemFromCart(product._id)
                      setReload(!reload)
                    }}
                    className="btn"
                  >
                    Remove from cart
                  </button>
        )
      )
    }
    
    
    

    return (
    
      <div className="cards">
            <div className="cards_img">
            {getRedirect(redirect)}
            <ImageHelper product={product}/>
            </div>
            <div className="cards_header">
                <h2>{cardTitle}</h2>
                <p>{cardDescription}</p>
                <p className="price">{cardPrice}<span>$</span></p>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
       
    //       <div className="card text-white bg-dark border border-info ">
    //         <div className="card-header lead">{cardTitle}</div>
    //         <div className="card-body">
    //           {getRedirect(redirect)}
    //           <ImageHelper product={product}/>
    //           <p className="lead bg-success font-weight-normal text-wrap">
    //             {cardDescription}
    //           </p>
    // <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
    //           <div className="row">
    //             <div className="col-12">
    //               {showAddToCart(addToCart)}
    //             </div>
    //             <div className="col-12">
    //               {showRemoveFromCart(removeFromCart)}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
        );
      
    
}
