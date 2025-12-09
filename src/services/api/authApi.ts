import { AuthResponse, LoginCredentials } from "@/features/auth/types";
import { api } from "./baseApi";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            })
        })
    })
})