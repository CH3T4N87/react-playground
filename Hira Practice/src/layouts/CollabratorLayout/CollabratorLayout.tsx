import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import diamondLogo from "@/assets/diamond.png";
import { useAuth } from "@/context/AuthContext";
import styles from "./CollabratorLayout.module.scss";

const CollabratorLayout = () => {
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
                    <NavLink to={""} className={styles.navLink}>Taskify</NavLink>
                    <NavLink to={""} className={styles.navLink}>Tasktic</NavLink>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.layoutNav}>
                    <Typography variant="label1">{user?.name}</Typography>
                    <Button variant="tertiary" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default CollabratorLayout