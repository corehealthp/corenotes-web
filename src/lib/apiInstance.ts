import axios from 'axios';
export const apiInstance = axios.create({
	// Configuration
	baseURL: process.env.API_URL ?? process.env.VITE_BASE_URL,
    withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
});