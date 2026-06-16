import { ROUTES } from "@/constants/routes";
import type { TempUser } from "@/context/types";

export const redirectR = (user: TempUser) => {
    
    window.location.href = ROUTES[user.policies[0] as keyof typeof ROUTES];

    // switch (user.policies[0]) {
    //     case Policies.SUPER_ADMIN:
    //         window.location.href = "/super-admin";
    //         return;
    //     case Policies.ORG_ADMIN:
    //         window.location.href = "/org-admin";
    //         return;
    //     default:
    //         window.location.href = "/collabrator";
    // }
}