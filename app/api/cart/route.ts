import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;
		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [{ token }],
			},
			include: {
				items: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_GET] Server error", error);
		return NextResponse.json(
			{
				message:
					"Something went wrong while retrieving data for the user's cart",
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {}
