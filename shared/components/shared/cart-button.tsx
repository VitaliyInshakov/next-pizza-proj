"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";
import { useCartStore } from "@/shared/store";

import { Button } from "../ui";
import { CartDrawer } from "./cart-drawer";

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const [totalAmount, items, loading] = useCartStore((state) => [
		state.totalAmount,
		state.items,
		state.loading,
	]);

	return (
		<CartDrawer>
			<Button
				loading={loading}
				className={cn("group relative", { "w-[105px]": loading }, className)}
			>
				<b>{totalAmount} ₴</b>
				<span className="mx-3 h-full w-[1px] bg-white/30" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart className="relative h-4 w-4" strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight className="absolute right-5 w-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
			</Button>
		</CartDrawer>
	);
};
