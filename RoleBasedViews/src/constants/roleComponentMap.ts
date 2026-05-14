import { Roles } from "../App.types";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import HomePage from "../components/HomePage/HomePage";
import SupportPanel from "../components/SupportPanel/SupportPanel";

export const ROLE_COMPONENT_MAP: Record<Roles, React.ComponentType<any>> = {
    [Roles.ADMIN]: AdminPanel,
    [Roles.CUSTOMER_SUPPORT]: SupportPanel,
    [Roles.USER]: HomePage
}

  