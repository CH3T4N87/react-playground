import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./SuperAdminLayout.module.scss";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import diamondLogo from "@/assets/diamond.png";
import { useAuth } from "@/context/AuthContext";

const SuperAdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.hiraContainer}>
                    <img src={diamondLogo} alt="diamondLogo" />
                    <span>Hira</span>
                </div>
                <div className={styles.navContainer}>
                    <NavLink to={"dashboard"} className={styles.navLink}>Dashboard</NavLink>
                    <NavLink to={"organizations"} className={styles.navLink}>Organizations</NavLink>
                    <NavLink to={"organizations/archived"} className={styles.navLink}>Archived</NavLink>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.layoutNav}>
                    <Typography variant="label1">{user?.name}</Typography>
                    <Button variant="tertiary" onClick={() => { logout(); navigate("/");}}>Logout</Button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default SuperAdminLayout