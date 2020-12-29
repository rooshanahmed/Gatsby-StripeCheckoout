import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { navigate } from "gatsby"

const stripePromise = loadStripe(
  "pk_test_51I3GslEnWioBjOItEgqTwSFPgdBn1Nsf1bA7wx3nOSH5ww1GDvNl3hipOrMc9ZAUbDVhFAd0HJ7WBk4JF59rJecn00lvgFgrUC"
)

export default function SessionCheckout() {
  const redirectToCheckout = async() => {
    const stripe = await stripePromise;
    const response = await fetch('/.netlify/functions/checkout')
    const data = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: data.id
    })
  }

  return (
    <div>
      <h1>Checkout through Netlify Server</h1>
      <br />
      <button onClick={redirectToCheckout}>Checkout</button>
      <br />
      <button onClick={() => {navigate("/")}}>Home Page</button>
    </div>
  )
}
