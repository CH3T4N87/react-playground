import type { ActionDispatch } from "react";
import type { LoginAction, User } from "../../App.types";

export interface DashboardShellProps {
    user: User;
    loginStateDispatch : ActionDispatch<[action: LoginAction]>
}