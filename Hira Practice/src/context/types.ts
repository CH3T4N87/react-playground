import type { Policies } from "@/types/policies";


export interface AuthContextType {
    user: TempUser | null;
    token: string | null;
    login: (userData: TempUser, authToken: string) => void;
    logout: () => void;
}

export interface TempUser {
    name: string,
    email: string,
    policies: Array<Policies>
}