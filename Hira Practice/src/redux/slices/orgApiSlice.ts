import type { OrganizationData } from "@/pages/SuperAdmin/AddOrganizationPage/AddOrganizationPage.types";
import { apiSlice } from "./apiSlice";
import type { GetArchivedOrganizationsResponse, IOrgResponse } from "../types";

export const orgApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrganization: builder.query<OrganizationData, string>({
            query: (id) => ({
                url: `/organization/get_organization_by_id/${id}`,
                method: 'GET'
            })
        }),
        getOrganizations: builder.query<OrganizationData[], void>({
            query: () => ({
                url: '/organization/get_all_active_organizations',
                method: 'GET'
            }),
            providesTags: ["getOrgs"]
        }),
        createOrganization: builder.mutation<IOrgResponse, OrganizationData>({
            query: (data) => ({
                url: "/organization/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["getOrgs"]
        }),
        updateOrganization: builder.mutation<IOrgResponse, { id: string, data: OrganizationData }>({
            query: ({ id, data }) => ({
                url: `/organization/update/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["getOrgs"]
        }),
        deleteOrganization: builder.mutation<IOrgResponse, string>({
            query: ( id ) => ({
                url: `/organization/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["getOrgs"]
        }),
        getArchivedOrganizations: builder.query<GetArchivedOrganizationsResponse, void>({
            query: () => ({
                url: "/organization/get_archived",
                method: "GET",
            }),
            providesTags: ["getArchivedOrgs"]
        }),
        restoreOrganization: builder.mutation<IOrgResponse, string>({
            query: (id) => ({
                url: `/organization/restore/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["getArchivedOrgs"]
        }),
    })
})

export const {
    useGetOrganizationQuery,
    useGetOrganizationsQuery,
    useGetArchivedOrganizationsQuery,
    useCreateOrganizationMutation,
    useUpdateOrganizationMutation,
    useDeleteOrganizationMutation,
    useRestoreOrganizationMutation
} = orgApiSlice;





