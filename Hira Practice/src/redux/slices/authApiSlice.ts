import { apiSlice } from "./apiSlice";
import type { IGetUserRequest, IGetUserResponse } from "../types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<IGetUserResponse, IGetUserRequest>({
            query: (data) => ({
                url: "/auth/me",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetUserMutation } = authApiSlice;