"use client";

import React from "react";
import { useIntersection } from "react-use";

import { useCategoryStore } from "@/shared/store";

import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
	title: string;
	categoryId: number;
	items: any[];
	className?: string;
}

export const ProductGroupList: React.FC<Props> = ({
	title,
	categoryId,
	items,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, title, intersection?.isIntersecting]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="mb-5 font-extrabold" />
			<div className="grid grid-cols-3 gap-[50px]">
				{items.map((item, index) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						imageUrl={item.imageUrl}
						price={item.items[0].price}
						count={index % 2}
					/>
				))}
			</div>
		</div>
	);
};
