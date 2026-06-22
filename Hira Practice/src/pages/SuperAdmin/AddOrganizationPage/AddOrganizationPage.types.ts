import z from "zod";
import type { ZOrganizationSchema } from "./AddOrganizationPage.schema";

export type OrganizationData = z.infer<typeof ZOrganizationSchema>;

export interface AddOrganizationPageProps {
    id?: string,
    onClose: () => void
}