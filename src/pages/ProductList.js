import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const stripePromise = loadStripe(
  "pk_test_51I3GslEnWioBjOItEgqTwSFPgdBn1Nsf1bA7wx3nOSH5ww1GDvNl3hipOrMc9ZAUbDVhFAd0HJ7WBk4JF59rJecn00lvgFgrUC"
)

export default function ProductList({ location }) {
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
                description
                images
              }
            }
          }
        }
      }
    `
  )
  console.log('Data: ',data);

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
      <h1>Product List</h1>
      <br />
      {
        data.prices.edges.map((node) => (
          <div key={node.node.id}>
            <h2>Product Name: {node.node.product.name}</h2>
            <h3>Product Description: {node.node.product.description}</h3>
            <h4>Product Price: {node.node.unit_amount}</h4>
            <div><img src={node.node.product.images[0]} width="300px" /></div>
            <button>Checkout</button>
          </div>
        ))
      }
    </div>
  )
}
