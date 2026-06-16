import type { OrganizationData } from "@/pages/SuperAdmin/AddOrganizationPage/AddOrganizationPage.types";


export interface AuthResponse {
    data: any,
    message: string,
    token?: string,
}

export interface IOrgResponse {
    message?: string,
    data: OrganizationData
}

export type GetArchivedOrganizationsResponse = OrganizationData[];