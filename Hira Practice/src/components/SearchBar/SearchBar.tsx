import { useAppDispatch } from "@/redux/store/hooks";
import styles from "./SearchBar.module.scss";
import { setSearch } from "@/redux/slices/filterAndSearchSlice";
const SearchBar = () => {
    const dispatch = useAppDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    }
    return (
        <div className={styles.searchBar}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" onChange={onChange} />
        </div>
    )
}

export default SearchBar