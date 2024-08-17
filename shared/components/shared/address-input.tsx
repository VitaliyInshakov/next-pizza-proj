"use client";

import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";

import { Input } from "../ui";

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	const { ref } = usePlacesWidget<HTMLInputElement>({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
		onPlaceSelected: (place) => {
			onChange?.(place.formatted_address);
		},
		options: {
			types: ["geocode", "establishment"],
			componentRestrictions: { country: "ua" },
		},
	});

	return <Input ref={ref} className="text-md h-12" />;
};
