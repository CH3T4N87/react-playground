import type { Roles } from "../../App.types"
import { ROLE_COMPONENT_MAP } from "../../constants/roleComponentMap"
import AdminPanel from "../AdminPanel/AdminPanel"
import HomePage from "../HomePage/HomePage"
import type { DashboardShellProps } from "./DashboardShell.types"

const DashboardShell = ({ user, loginStateDispatch}: DashboardShellProps) => {
    const RoleComponent = ROLE_COMPONENT_MAP[user.role];
    if(!RoleComponent) return <HomePage/>
  return (
    <div>
        <span>{JSON.stringify(user)}</span>
        <RoleComponent/>
    </div>
  )
}

export default DashboardShell