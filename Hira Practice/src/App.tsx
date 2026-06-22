import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer";
import { useAppDispatch } from "./redux/store/hooks";
import { useEffect } from "react";
import { restoreSession } from "./redux/slices/authSlice";
import { useGetUserMutation } from "./redux/slices/authApiSlice";
const App = () => {

  const dispatch = useAppDispatch();
  const [getUser] = useGetUserMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser({ token: localStorage.getItem("token") ?? "" }).unwrap();
        dispatch(restoreSession({ user: response.user }));
      } catch (error) {
        console.log("Session expired.");
      }
    }
    fetchUser();
  }, [])


  return (
    <div className={styles.App}>
      <SnackbarContainer />
      <Outlet />
    </div>
  )
}

export default App