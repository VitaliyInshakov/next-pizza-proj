import { Trash2Icon } from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";

import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";

interface Props {
	className?: string;
	id: number;
	imageUrl: string;
	details: string;
	name: string;
	price: number;
	quantity: number;
	disabled?: boolean;
	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
}

export const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemove,
	className,
}) => {
	return (
		<div
			className={cn(
				"flex gap-6 bg-white p-5",
				{
					"pointer-events-none opacity-50": disabled,
				},
				className
			)}
		>
			<CartItem.Image src={imageUrl} />

			<div className="flex-1">
				<CartItem.Info name={name} details={details} />
				<hr className="my-3" />
				<div className="flex items-center justify-between">
					<CountButton onClick={onClickCountButton} value={quantity} />
					<div className="flex items-center gap-3">
						<CartItem.Price value={price} />
						<Trash2Icon
							onClick={onClickRemove}
							className="cursor-pointer text-gray-400 hover:text-gray-600"
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
