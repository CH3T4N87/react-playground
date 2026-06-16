import styles from "./Typography.module.scss";
import type { TypographyProps } from "./Typography.types";
const Typography = ({ children, variant }: TypographyProps) => {
    return (
        <span className={styles[variant]}>{children}</span>
    )
}

export default Typography