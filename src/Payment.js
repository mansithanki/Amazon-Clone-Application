
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat  from 'react-currency-format';
import {getBasketTotal} from "./reducer"


function Payment() {
    const[{basket,user}, dispatch] = useStateValue();
    const stripe=useStripe();
    const elements = useElements();


    const [error, setError]=useState(null);
    const [disabled, setDisabled]= useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe


    }
    const handleChange=event=>{
        setDisabled(event.empty);
        setError(event.error?event.error.message:"");

    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout(
                    <Link to= "/checkout"> {basket?.length} items</Link>
                )
            </h1>
        </div>

        {/* Payment section - delivery address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3> Delivery Addresss</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>123 React Blvd</p>
                <p>Boston, MA</p>
            </div>
        </div>
        {/* Payment section - Review Items */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment__items'>
                {basket.map(item =>(
                    <CheckoutProduct
                    id ={item.id}
                    title={item.title}
                    image ={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
                ))}
            </div>

        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Payment Method</h3>
            </div>
            <div className='payment__details'>
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange}/>
                    <div className='payment__priceContainer'>
                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                    </div>
                    {/* Errors */}
                                {error && <div>{error}</div>}
                </form>

            </div>

        </div>

    </div>
  )
}

export default Payment