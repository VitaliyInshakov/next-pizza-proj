import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma-client";
import { Container, ProductForm } from "@/shared/components/shared";

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							productItems: true,
						},
					},
				},
			},
			productItems: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="my-10 flex flex-col">
			<ProductForm product={product} />
		</Container>
	);
}
