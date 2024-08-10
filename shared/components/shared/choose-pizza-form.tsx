import React from "react";

import { Ingredient, ProductItem } from "@prisma/client";

import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { cn } from "@/shared/lib/utils";

import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	className?: string;
	onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}) => {
	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="mb-1 font-extrabold" />
				<p className="text-gray-400">{textDetaills}</p>
				<div className="mt-5 flex flex-col gap-4">
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>
				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
				>
					Add to cart by {totalPrice} &#8372;
				</Button>
			</div>
		</div>
	);
};
