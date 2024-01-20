import { apiInstance } from "./api";

export const fetchEmailVerify = async (email?: any, host?: string) => {
	try {
		const api = apiInstance(host);
		const response = await api.post(`/recoverPassword/`, { email });
		return response;
	} catch (error: any) {
		console.log("Erro", error.message);
	}
};
