"use client";

import { Category } from "@prisma/client";
import React from "react";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

interface Props {
	className?: string;
	items: Category[];
}

export const Categories: React.FC<Props> = ({ className, items }) => {
	const activeCategoryId = useCategoryStore((state) => state.activeId);

	return (
		<div
			className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
		>
			{items.map(({ id, name }, index) => (
				<a
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						activeCategoryId === id &&
							"bg-white shadow-md shadow-gray-200 text-primary"
					)}
					href={`/#${name}`}
					key={index}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};
