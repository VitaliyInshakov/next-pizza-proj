import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
	id: number;
	name: string;
	price: number;
	count?: number;
	imageUrl?: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	count,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo" />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
				<p className="text-sm text-gray-400">
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
					альфредо, чеснок
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						from <b>{price} &#8372;</b>
					</span>

					{count ? (
						<CountButton value={count} size="lg" />
					) : (
						<Button variant="secondary">
							<Plus className="w-4 h-4 mr-1" />
							Add
						</Button>
					)}
				</div>
			</Link>
		</div>
	);
};
