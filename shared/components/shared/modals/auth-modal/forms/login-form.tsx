import { signIn } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "../../../form";
import { Title } from "../../../title";
import { TFormLoginValues, formLoginSchema } from "./schemas";

interface Props {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (!resp?.ok) {
				throw Error();
			}

			toast.success("You have successfully logged into your account.", {
				icon: "✅",
			});

			onClose?.();
		} catch (error) {
			console.error("Error [LOGIN]", error);
			toast.error("Failed to log into your account", {
				icon: "❌",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex items-center justify-between">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">
							Enter your email to log into your account
						</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>

				<FormInput name="email" label="E-Mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Log in
				</Button>
			</form>
		</FormProvider>
	);
};
