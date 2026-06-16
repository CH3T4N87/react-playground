import styles from "./Navbar.module.scss";
const Navbar = () => {
  return (
    <header className={styles.header}>
        <span className={styles.Hira}>HIRA</span>
        <nav className={styles.navbar}>
            <span>features</span>
            <span>guide</span>
            <span>pricing</span>
            <span>solutions</span>
        </nav>
    </header>
  )
}

export default Navbar