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
          </div>
        ))
      }
    </div>
  )
}
