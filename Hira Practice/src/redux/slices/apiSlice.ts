import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";



export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
            timeout: 20000,
            prepareHeaders: (headers, { getState }) => {
                // Get token from Redux state instead of localStorage
                const token = (getState() as RootState).auth.token;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            },
        }
    ),
    tagTypes: ["getOrgs", "getArchivedOrgs"],
    endpoints: () => ({})
})