"use client";

import React from "react";

import { Category } from "@prisma/client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store";

interface Props {
	className?: string;
	items: Category[];
}

export const Categories: React.FC<Props> = ({ className, items }) => {
	const activeCategoryId = useCategoryStore((state) => state.activeId);

	return (
		<div
			className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1", className)}
		>
			{items.map(({ id, name }, index) => (
				<a
					className={cn(
						"flex h-11 items-center rounded-2xl px-5 font-bold",
						activeCategoryId === id &&
							"bg-white text-primary shadow-md shadow-gray-200"
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
