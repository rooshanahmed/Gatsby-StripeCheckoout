import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"

const stripePromise = loadStripe(
  "pk_test_51I3GslEnWioBjOItEgqTwSFPgdBn1Nsf1bA7wx3nOSH5ww1GDvNl3hipOrMc9ZAUbDVhFAd0HJ7WBk4JF59rJecn00lvgFgrUC"
)

export default function Home({ location }) {
  const data = useStaticQuery(
    graphql`
      query ProductPrices {
        prices: allStripePrice {
          edges {
            node {
              id
              active
              currency
              unit_amount
              product {
                id
                name
              }
            }
          }
        }
      }
    `
  )
  console.log('Data: ',data);

  return (
    <div>
      <h1>Product List</h1>
      <br />
    </div>
  )
}
