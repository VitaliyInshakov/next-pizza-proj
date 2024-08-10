import { CircleCheck } from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

export const IngredientItem: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div
			className={cn(
				"relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md",
				{ "border border-primary": active },
				className
			)}
			onClick={onClick}
		>
			{active && (
				<CircleCheck className="absolute right-2 top-2 text-primary" />
			)}
			<img width={110} height={110} src={imageUrl} />
			<span className="mb-1 text-xs">{name}</span>
			<span className="font-bold">{price} ₴</span>
		</div>
	);
};
