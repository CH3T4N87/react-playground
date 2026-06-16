import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import GUARDS from "./guards";
import { Policies } from "@/types/policies";
import OrgAdminLayout from "@/layouts/OrgAdminLayout/OrgAdminLayout";
import CollabratorLayout from "@/layouts/CollabratorLayout/CollabratorLayout";
import DeleteOrganization from "@/pages/SuperAdmin/DeleteOrganization/DeleteOrganization";
import ArchivedOrganizations from "@/pages/SuperAdmin/ArchivedOrganizations/ArchivedOrganizations";
import RestoreOrganization from "@/pages/SuperAdmin/RestoreOrganization/RestoreOrganization";
const SetPasswordPage = lazy(() => import("@/pages/SetPasswordPage/SetPasswordPage"));
const AddOrganizationPage = lazy(() => import("@/pages/SuperAdmin/AddOrganizationPage/AddOrganizationPage"));
const UnauthorizedPage = lazy(() => import("@/pages/UnauthorizedPage/UnauthorizedPage"));
const SuperAdminLayout = lazy(() => import("@/layouts/SuperAdminLayout/SuperAdminLayout"));
const Dashboard = lazy(() => import("@/pages/SuperAdmin/Dashboard/Dashboard"));
const OrganizationsPage = lazy(() => import("@/pages/SuperAdmin/OrganizationsPage/OrganizationsPage"));
const App = lazy(() => import("../App"));
const LandingPage = lazy(() => import("@/pages/LandingPage/LandingPage"));

type Predicate = () => boolean;

const canActive = (component: React.ComponentType, guards: Predicate[]) => {
    if (guards.every(guard => guard())) {
        return component;
    }
    return UnauthorizedPage;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <LandingPage />
            },
            {
                path: "/super-admin",
                Component: canActive(SuperAdminLayout, [GUARDS.isLoggedIn, () => GUARDS.hasAccess([Policies.SUPER_ADMIN])]),
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "organizations",
                        element: <OrganizationsPage />,
                        children: [
                            {
                                path: "add",
                                element: <AddOrganizationPage />
                            },
                            {
                                path: "update/:id",
                                element: <AddOrganizationPage />
                            },
                            {
                                path: "delete/:id",
                                element: <DeleteOrganization />
                            },
                        ]
                    },
                    {
                        path: "organizations/archived",
                        element: <ArchivedOrganizations />,
                        children: [
                            {
                                path: "restore/:id",
                                element: <RestoreOrganization/>
                            }
                        ]
                    },
                ]
            },
            {
                path: "/org-admin",
                element: <OrgAdminLayout />
            },
            {
                path: "/collabrator",
                element: <CollabratorLayout />
            },
            {
                path: "/auth/org_admin_set_password",
                element: <SetPasswordPage />
            }
        ]
    }
])



