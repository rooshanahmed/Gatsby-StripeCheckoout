import React from "react"
import { graphql, useStaticQuery } from "gatsby"


export default function Home() {
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
