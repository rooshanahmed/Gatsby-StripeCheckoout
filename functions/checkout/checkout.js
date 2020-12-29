const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Adidas T-shirt',
              images: ["https://photos6.spartoo.eu/photos/661/6610458/6610458_500_A.jpg"]
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8888/payment-success",
      cancel_url: "http://localhost:8888/payment-error",
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
