"use server";

import { cookies } from "next/headers";

import { OrderStatus } from "@prisma/client";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
		}

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});
	} catch (error) {
		console.error("[CreateOrder] Server error", error);
	}
}
