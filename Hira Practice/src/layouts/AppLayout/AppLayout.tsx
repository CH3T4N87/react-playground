import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import diamondLogo from "@/assets/diamond.png";
import styles from "./AppLayout.module.scss";
import { NAV_ITEMS_BY_ROLE } from "./constants/NavItems";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { logout } from "@/redux/slices/authSlice";



const AppLayout = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const navItems = NAV_ITEMS_BY_ROLE[user?.policies[0] ?? ""] ?? [];

    return (
        <div className={styles.layoutContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.hiraContainer}>
                    <img src={diamondLogo} alt="diamondLogo" />
                    <span>Hira</span>
                </div>
                <div className={styles.navContainer}>
                    {navItems.map(({ label, to }) => (
                        <NavLink key={label} to={to} className={styles.navLink}>
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.layoutNav}>
                    <Typography variant="label">{user?.name}</Typography>
                    <Button
                        variant="tertiary"
                        onClick={() => {
                            dispatch(logout());
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;