"use client";

import React from "react";

import { ProductWithRelations } from "@/@types/prisma";

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
	const firstItem = product.productItems[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

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
