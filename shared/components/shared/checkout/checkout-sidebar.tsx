import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";

import { Button, Skeleton } from "../../ui";
import { WhiteBlock } from "../white-block";
import { CheckoutItemDetails } from "./checkout-item-details";

const VAT = 15;
const DELIVERY_PRICE = 100;

interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	className,
}) => {
	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

	return (
		<WhiteBlock className={cn("sticky top-4 p-6", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Total:</span>
				{loading ? (
					<Skeleton className="h-11 w-48" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">
						{totalPrice} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						Cart cost:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${totalAmount} ₴`
					)
				}
			/>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						Tax:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${vatPrice} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Delivery:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="h-6 w-16 rounded-[6px]" />
					) : (
						`${DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				loading={loading}
				type="submit"
				className="mt-6 h-14 w-full rounded-2xl text-base font-bold"
			>
				Go to payment
				<ArrowRight className="ml-2 w-5" />
			</Button>
		</WhiteBlock>
	);
};
