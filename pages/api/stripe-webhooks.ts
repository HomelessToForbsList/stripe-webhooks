//import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  console.log('req: ',req)

  const sig = req.headers['stripe-signature'];

  let event;
  const endpointSecret = "whsec_3faf8802de21905d3314b0d5addd6910e4099833b71a97d42cc309ad989dc6f0";

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error:`);
    return;
  }
  console.log('event: ', event)

  return res.status(200).json('')
}