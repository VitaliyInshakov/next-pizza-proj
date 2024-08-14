import { Container, Title } from "@/shared/components/shared";

export default function CheckoutPage() {
	return (
		<Container className="mt-10">
			<Title
				text="Placing an order"
				className="mb-8 text-[36px] font-extrabold"
			/>

			<div className="flex gap-10">
				<div className="mb-20 flex flex-1 flex-col gap-10"></div>

				<div className="w-[450px]"></div>
			</div>
		</Container>
	);
}
