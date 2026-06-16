import Typography from "@/components/Typography/Typography"
import styles from "./HeroSection.module.scss"

const HeroSection = () => {
    return (
        <>
            <p className={styles.heroText}>
                <Typography variant="h1">More projects.</Typography>
                <Typography variant="h1">More agents.</Typography>
                <Typography variant="h1">Less chaos.</Typography>
            </p>
            <p className={styles.heroDescription}>
                <Typography variant="caption">Hira orchestrates across your AI tech stack
                    turning plans into actions and shipped work.</Typography>
            </p>
        </>
    )
}

export default HeroSection