import { NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET() {
	const users = await prisma.ingredient.findMany();
	return NextResponse.json(users);
}
