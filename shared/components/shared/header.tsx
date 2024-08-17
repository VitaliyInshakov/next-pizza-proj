"use client";

import React from "react";
import toast from "react-hot-toast";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/shared/lib/utils";

import { CartButton } from "./cart-button";
import { Container } from "./container";
import { AuthModal } from "./modals";
import { ProfileButton } from "./profile-button";
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
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	React.useEffect(() => {
		let toastMessage = "";

		if (searchParams.has("paid")) {
			toastMessage = "Order successfully paid! Information sent to email.";
		}

		if (searchParams.has("verified")) {
			toastMessage = "Email successfully confirmed!";
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace("/");
				toast.success(toastMessage, {
					duration: 3000,
				});
			}, 1000);
		}
	}, []);

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
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
