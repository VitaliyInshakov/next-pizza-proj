"use client";

import { User } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import { Button } from "../ui";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { SearchInput } from "./search-input";

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	return (
		<header className={cn("border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="log" width={35} height={35} />
						<div>
							<h1 className="text-2xl font-black uppercase">Next Pizza</h1>
							<p className="text-sm leading-3 text-gray-400">
								it could not be tastier
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Sign in
					</Button>

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
