import axios, { AxiosInstance } from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const apiInstance = (host?: string): AxiosInstance => {
	return axios.create({
		baseURL: `${url}/api`,
		headers: {
			"content-type": "application/json",
			accept: "application/json",
		},
	});
};
