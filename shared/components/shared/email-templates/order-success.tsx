import React from "react";

import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface Props {
	orderId: number;
	items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Thank you for your purchase! 🎉</h1>

		<p>Your order #{orderId} has been paid. List of products:</p>

		<hr />

		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} ₴ x{" "}
					{item.quantity} pcs. = {item.productItem.price * item.quantity} ₴
				</li>
			))}
		</ul>
	</div>
);
