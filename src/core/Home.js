import React,{useState,useEffect} from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { getAllProducts } from './helper/coreapicalls'


export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getAllProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <Base title="Home page" description="Essentials at your doorstep">
            {/* <div className="row text-center">
               <h1 className="text-white">All of tshirts</h1>
                <div className="row"> */}
                <div className="main_content">
                    {/* <h3>T-SHIRTS</h3> */}
                    {products.map((product,index)=>{
                        console.log(product)
                        return (
                            // <div className="col-4 mb-4" key={index}>
                                <Card key={index} product={product}/>
                            // </div>
                        )
                        
                    })}
                {/* </div>
            </div> */}
            </div>
        </Base>
    )
}
