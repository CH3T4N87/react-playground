type SubscriptionType = "BASIC" | "HALF" | "FULL"

export interface OrganizationData {
    organization_id?: string,
    organization_name: string,
    // organization_logo: File,
    org_admin_name: string,
    org_admin_email: string,
    subscription_name: SubscriptionType
}

export interface AddOrganizationPageProps {
    // isEditingMode?: boolean
}



export type ModalState =
  | { type: "add" }
  | { type: "update"; id: string }
  | { type: "delete"; id: string }
  | null;