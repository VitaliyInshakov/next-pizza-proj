"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from "@/shared/components/shared";
import {
	CheckoutFormValues,
	checkoutFormSchema,
} from "@/shared/constants/checkout-form-schema";
import { useCart } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
		useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			toast.error("Failed to create order", {
				icon: "❌",
			});
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className="mt-10">
			<Title
				text="Placing an order"
				className="mb-8 text-[36px] font-extrabold"
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="mb-20 flex flex-1 flex-col gap-10">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? "pointer-events-none opacity-40" : ""}
							/>
							<CheckoutAddressForm
								className={loading ? "pointer-events-none opacity-40" : ""}
							/>
						</div>

						<div className="w-[450px]">
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
