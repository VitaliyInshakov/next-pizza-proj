import { InfoBlock } from "@/shared/components/shared";

export default function UnauthorizedPage() {
	return (
		<div className="mt-40 flex flex-col items-center justify-center">
			<InfoBlock
				title="Access Denied"
				text="This page can only be viewed by authorized users."
				imageUrl="/assets/images/lock.png"
			/>
		</div>
	);
}
