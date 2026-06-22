import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.types";

const Filter = ({ name, options, onChange }: FilterProps) => {
    return (
        <select name={name} id="" className={styles.filter} onChange={onChange}>
            <option value="">Choose an option</option>
            {
                options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)
            }
        </select>
    )
}

export default Filter