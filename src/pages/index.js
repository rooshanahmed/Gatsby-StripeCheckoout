import React from "react"
import { loadStripe } from "@stripe/stripe-js"


const stripePromise = loadStripe("pk_test_51I3GslEnWioBjOItEgqTwSFPgdBn1Nsf1bA7wx3nOSH5ww1GDvNl3hipOrMc9ZAUbDVhFAd0HJ7WBk4JF59rJecn00lvgFgrUC");


export default function Home() {
  const redirectToCheckout = async() => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1I3Py9EnWioBjOIt6ePhCE28", quantity: 5 }],
      successUrl: `http://localhost:8888/payment-success`,
      cancelUrl: `http://localhost:8888/payment-error`,
    });
  }
  
  return (
    <div>
      <h1>Hello World</h1>
      <br />
      <button onClick={redirectToCheckout}>Checkout</button>
    </div>
  )
}
