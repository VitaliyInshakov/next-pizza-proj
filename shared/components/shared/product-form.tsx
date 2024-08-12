"use client";

import React from "react";
import toast from "react-hot-toast";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";

import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
	product,
	onSubmit: _onSubmit,
}) => {
	const [addCartItem, loading] = useCartStore((state) => [
		state.addCartItem,
		state.loading,
	]);
	const firstItem = product.productItems[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			await addCartItem({
				productItemId: productItemId ?? firstItem.id,
				ingredients,
			});
			toast.success(product.name + " added to cart");
			_onSubmit?.();
		} catch (err) {
			toast.error("Failed to add item to cart");
			console.error(err);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.productItems}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	);
};
