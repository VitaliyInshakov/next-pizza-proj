import { url } from "inspector";
import Stripe from "stripe";

interface Props {
	description: string;
	orderId: number;
	amount: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createPayment(details: Props) {
	try {
		const checkoutSession: Stripe.Checkout.Session =
			await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: [
					{
						price_data: {
							unit_amount: details.amount * 100,
							currency: "UAH",
							product_data: {
								name: details.description,
							},
						},
						quantity: 1,
					},
				],
				mode: "payment",
				success_url: process.env.STRIPE_CALLBACK_URL,
				cancel_url: process.env.STRIPE_CALLBACK_URL,
				metadata: {
					order_id: details.orderId,
				},
			});

		return checkoutSession;
	} catch (error) {
		console.log(error);
	}
}
