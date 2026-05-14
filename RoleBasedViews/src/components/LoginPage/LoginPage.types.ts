import type { ActionDispatch } from "react";
import type { LoginAction } from "../../App.types";

export interface LoginPageProps {
    loginStateDispatch: ActionDispatch<[action: LoginAction]>
}

export interface LoginCredentials {
    email: string,
    password: string
}

export type LoginCredentialsAction =
    {
        type: "SET_FIELD", field: "email" | "password", value: string
    }