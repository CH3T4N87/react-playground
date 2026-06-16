import type { Policies } from "@/types/policies";

export interface TempUser{
    name: string,
    email: string,
    policies: Array<Policies>
}