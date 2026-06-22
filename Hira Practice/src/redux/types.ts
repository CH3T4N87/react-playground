import type { User } from "@/context/types";
import type { OrganizationData } from "@/pages/SuperAdmin/AddOrganizationPage/AddOrganizationPage.types";


export interface AuthResponse {
    data: any,
    message: string,
    access_token?: string,
}

export interface IOrgResponse {
    message?: string,
    data: OrganizationData
}

export type GetArchivedOrganizationsResponse = OrganizationData[];

export interface AuthState {
  user: User | null; 
}

export interface IGetUserRequest {
    token: string
}

export interface IGetUserResponse {
    user: User
}

export interface FilterAndSearchQuery {
    search: string,
    sortBy: string,
    page_limit: number | 5, //default page limit is 5(entries per page)
    page_number: number
}