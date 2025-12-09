import { logout, setCredentials } from '@/features/auth/authSlice';
import { AuthResponse } from '@/features/auth/types';
import { RootState } from '@/store/store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth?.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await rawBaseQuery({
            url: '/auth/refresh-token',
            method: 'POST'
        }, api, extraOptions);

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data as AuthResponse));
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})
