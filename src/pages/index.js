import React from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51I3GslEnWioBjOItEgqTwSFPgdBn1Nsf1bA7wx3nOSH5ww1GDvNl3hipOrMc9ZAUbDVhFAd0HJ7WBk4JF59rJecn00lvgFgrUC"
)

export default function Home({ location }) {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        { price: "price_1I3Py9EnWioBjOIt6ePhCE28", quantity: 5 },
        { price: "price_1I3QZGEnWioBjOItfwmhHtHF", quantity: 3 },
      ],
      successUrl: `${location.origin}/payment-success`,
      cancelUrl: `${location.origin}/payment-error`,
    })
  }

  return (
    <div>
      <h1>Hello World</h1>
      <br />
      <button onClick={redirectToCheckout}>Checkout</button>
    </div>
  )
}
