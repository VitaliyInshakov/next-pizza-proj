import { NextRequest, NextResponse } from "next/server";

import { OrderStatus } from "@prisma/client";

import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const header = stripe.webhooks.generateTestHeaderString({
			payload: body,
			secret: endpointSecret,
		});
		const event = stripe.webhooks.constructEvent(body, header, endpointSecret);

		if (
			event.type === "checkout.session.completed" ||
			event.type === "checkout.session.expired"
		) {
			const checkoutSessionCompleted = event.data.object;

			const order = await prisma.order.findFirst({
				where: {
					id: Number(checkoutSessionCompleted.metadata?.order_id),
				},
			});

			if (!order) {
				return NextResponse.json({ error: "Order not found" });
			}

			const isCompleted = checkoutSessionCompleted.status === "complete";

			await prisma.order.update({
				where: {
					id: order.id,
				},
				data: {
					status: isCompleted ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
				},
			});

			const items = JSON.parse(order?.items as string) as CartItemDTO[];
			if (isCompleted) {
				await sendEmail(
					order.email,
					"Next Pizza / Your order has been successfully placed. 🎉",
					OrderSuccessTemplate({ orderId: order.id, items })
				);
			} else {
				// Письмо о неуспешной оплате
			}
		}
	} catch (error) {
		console.log("[Checkout Callback] Error:", error);
		return NextResponse.json({ error: "Server error" });
	}
}
