import { createContext, useState } from "react";
import User from "../models/User";
import { useMutation } from "@tanstack/react-query";
import { GetProfile } from "../api/AuthApis";
import axios from "axios";
import { boolean } from "zod";

interface Context {
	profile: User | null;
	profileIsLoading: boolean;
	setProfile: (p: User | null) => void;
	fetchProfile: () => void;
}

interface Props {
	children: JSX.Element[] | JSX.Element;
}

export const MainContext = createContext<Context>({
	profile: null,
	profileIsLoading: false,
	setProfile: () => {},
	fetchProfile: () => {}
});

export const ContextProvider = ({ children }: Props) => {
	const [profile, setProfile] = useState<User | null>(null);

	const { mutate: fetchProfile, isLoading: profileIsLoading } = useMutation(() => GetProfile(), {
		onSuccess(res) {
			if (res.status === "success") {
				setProfile(res.data);
			} else {
				setProfile(null);
				localStorage.removeItem("jwt");
				axios.defaults.headers.common.Authorization = "";
			}
		},
		onError() {
			setProfile(null);
		}
	});

	const ctx = { profile, profileIsLoading, setProfile, fetchProfile };
	return <MainContext.Provider value={ctx}>{children}</MainContext.Provider>;
};
