import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

import Link from "next/link";

import { Button } from "../ui";

interface Props {
	onClickSignIn?: () => void;
	className?: string;
}
export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn,
}) => {
	const { data: session } = useSession();

	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={onClickSignIn}
					variant="outline"
					className="flex items-center gap-1"
				>
					<User size={16} />
					Sign in
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						<CircleUser size={18} />
						Profile
					</Button>
				</Link>
			)}
		</div>
	);
};
