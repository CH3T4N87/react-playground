import styles from "./Typography.module.scss";
import type { TypographyProps } from "./Typography.types";

const Typography = ({ 
    children, 
    variant, 
    as: Component = "span" 
}: TypographyProps) => {
    return (
        <Component className={styles[variant]}>{children}</Component>
    )
}

export default Typography