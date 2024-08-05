import {
	Container,
	Filters,
	ProductGroupList,
	Title,
	TopBar,
} from "@/components/shared";

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="All pizzas" size="lg" className="font-extrabold" />
			</Container>

			<TopBar />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					<div className="w-[250px]">
						<Filters />
					</div>

					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{/* <ProductGroupList
								title="Pizzas"
								categoryId={0}
								items={[1, 2, 3, 4, 5]}
							/>
							<ProductGroupList
								title="Combo"
								categoryId={1}
								items={[1, 2, 3, 4, 5]}
							/> */}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
