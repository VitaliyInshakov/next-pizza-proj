"use client";

import { ProductWithRelations } from "@/@types/prisma";
import React from "react";

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ProductForm: React.FC<Props> = ({ className }) => {
	return <div className={className}></div>;
};
