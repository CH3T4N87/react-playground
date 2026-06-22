import type { NavItem } from "../AppLayout.types";

export const NAV_ITEMS_BY_ROLE: Record<string, NavItem[]> = {
    SUPERADMIN: [
        { label: "Dashboard", to: "metrics" },
        { label: "Organizations", to: "organizations" },
        { label: "Archived", to: "organizations/archived" },
    ],
    ORGADMIN: [
        { label: "Taskify", to: "" },
        { label: "Tasktic", to: "" },
        { label: "Trello", to: "" },
        { label: "Proofhub", to: "" },
    ],
    PROJECT_COLLABRATOR: [
        { label: "Taskify", to: "" },
        { label: "Tasktic", to: "" },
    ],
};