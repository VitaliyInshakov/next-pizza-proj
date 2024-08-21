"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { User } from "@prisma/client";

import { updateUserInfo } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui";
import { Container } from "./container";
import { FormInput } from "./form";
import {
	TFormRegisterValues,
	formRegisterSchema,
} from "./modals/auth-modal/forms/schemas";
import { Title } from "./title";

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.error("Данные обновлены 📝", {
				icon: "✅",
			});
		} catch (error) {
			return toast.error("Ошибка при обновлении данных", {
				icon: "❌",
			});
		}
	};

	const onClickSignOut = () => {
		signOut({
			callbackUrl: "/",
		});
	};

	return (
		<Container className="my-10">
			<Title
				text={`Personal data | #${data.id}`}
				size="md"
				className="font-bold"
			/>

			<FormProvider {...form}>
				<form
					className="mt-10 flex w-96 flex-col gap-5"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name="email" label="E-Mail" required />
					<FormInput name="fullName" label="Full name" required />

					<FormInput
						type="password"
						name="password"
						label="New password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						label="Repeat password"
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className="mt-10 text-base"
						type="submit"
					>
						Save
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base"
						type="button"
					>
						Logout
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
