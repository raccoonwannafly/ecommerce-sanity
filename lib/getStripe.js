// This function returns a Promise that resolves with a newly created Stripe object once Stripe.js has loaded. It takes the same parameters passed when directly initializing a Stripe instance. If necessary, it will load Stripe.js for you by inserting the Stripe.js script tag. If you call loadStripe in a server environment it will resolve to null.
import { loadStripe } from '@stripe/stripe-js'

// Caching the stripePromise value to ensures that the loadStripe only called once, even if getStripe is called multiple times.
let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
}

export default getStripe;