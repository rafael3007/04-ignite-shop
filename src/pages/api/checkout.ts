import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body

  if(req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).end(`Method ${req.method} Not Allowed`)
  }

  if(!priceId) {
    return res.status(400).json({ error: "Price ID is required" })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}