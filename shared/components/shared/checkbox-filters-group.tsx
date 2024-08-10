"use client";

import React from "react";

import { Input, Skeleton } from "../ui";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	className?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selected?: Set<string>;
	name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	loading,
	searchInputPlaceholder = "Search...",
	className,
	onClickCheckbox,
	selected,
	name,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchValue(e.target.value);

	if (loading) {
		return (
			<div className={className}>
				<p className="mb-3 font-bold">{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
					))}

				<Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
			</div>
		);
	}

	const list = showAll
		? items.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
			)
		: (defaultItems || items).slice(0, limit);

	return (
		<div className={className}>
			<p className="mb-3 font-bold">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="border-none bg-gray-50"
						onChange={onChangeSearchValue}
					/>
				</div>
			)}

			<div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						value={item.value}
						text={item.text}
						name={name}
						endAdornment={item.endAdornment}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? "mt-4 border-t border-t-neutral-100" : ""}>
					<button
						onClick={() => setShowAll(!showAll)}
						className="mt-3 text-primary"
					>
						{showAll ? "Hide" : "+Show all"}
					</button>
				</div>
			)}
		</div>
	);
};
