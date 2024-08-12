"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

import { ProductForm } from "../product-form";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0",
					className
				)}
			>
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
