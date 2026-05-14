export enum Roles {
    ADMIN = "ADMIN",
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
    USER= "USER"
}

export interface User {
    id: number;
    name: string;
    role: Roles
}

export interface LoginState {
    isAuthenticated: boolean;
    user: null | User
}

export type LoginAction =
    {
        type: "LOGIN_SUCCESS",
        user: User
    } |
    {
        type: "LOGOUT"
    }