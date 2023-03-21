require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('public'))
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
// const storeItems = new Map([
//     [1 , {priceInCents:1000 , name:'Learn React Today'}] , 
//     [2 , {priceInCents:2000 , name:'Learn Css Today'}]
// ])

let dummy = [
    {id:1 , priceInCents:1000 , name:'Learn Angular Today' , quantity:3} ,
    {id:2 , priceInCents:2000 , name:'Learn Html Today' , quantity:2}
]


app.post('/create-checkout-session' , async(req , res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'] ,
            mode:'payment' , 
            // allow_promotion_codes:true,
            // shipping_address_collection:{
            //   allowed_countries:['UK'],
            // },
            line_items:dummy.map(item=>{
                // const storeItem = storeItems.get(item.id)
                return {
                    price_data:{
                        currency:'USD',
                        product_data:{
                            name:item.name
                        },
                        unit_amount:item.priceInCents,
                        tax_behavior: "exclusive",
                    } , 
                    quantity:item.quantity,
                    
                }
            }),
            automatic_tax:{enabled:true},
            // customer: 'cus_NXLdNEgVPAiiYV',
            success_url:`${process.env.SERVER_URL}/success.html`,
            cancel_url:`${process.env.SERVER_URL}/cancel.html`,

        })
        res.json({url:session.url})

    }
    catch(e){
        res.status(500).json({error:e.message})
    }
    
})

app.listen(3000)