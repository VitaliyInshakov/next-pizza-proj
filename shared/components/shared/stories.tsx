"use client";

import { X } from "lucide-react";
import React from "react";
import ReactStories from "react-insta-stories";

import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";

import { Container } from "./container";

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<>
			<Container
				className={cn(
					"my-10 flex items-center justify-between gap-2",
					className
				)}
			>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="h-[250px] w-[200px] animate-pulse rounded-md bg-gray-200"
						/>
					))}

				{stories.map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						className="cursor-pointer rounded-md"
						height={250}
						width={200}
						src={story.previewImageUrl}
					/>
				))}

				{open && (
					<div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/80">
						<div className="relative" style={{ width: 520 }}>
							<button
								className="absolute -right-10 -top-5 z-30"
								onClick={() => setOpen(false)}
							>
								<X className="absolute right-0 top-0 h-8 w-8 text-white/50" />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map((item) => ({
										url: item.sourceUrl,
									})) || []
								}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
