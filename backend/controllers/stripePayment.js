const stripe = require("stripe")("sk_test_51Gt5IgJMyjFak4MYmQ2b8x7DKLWV8LPMaWeaHI9EtVdpsY8gUjb8kjmnLNNLlR97E1XaqZu2HhZJLuy9mmpJynlT003QaeWrmA")
const uuid = require("uuid/v4")

exports.makePayment = (req,res) => {
    const {products,token} = req.body
    console.log("PRODUCTS",products)
    let amount = 0
    products.map(p=>{
        amount= amount + p.price
    })
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source:token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: amount,
            currency: "usd",
            customer:customer.id,
            receipt_email:token.email,
            description:"a test account",
            shipping:{
                name: token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.code.address_zip
                }
            }
        },{idempotencyKey})
        .then(result=>res.status(200).json(result))
        .catch(err => console.log(err))
    }).catch()

    
}