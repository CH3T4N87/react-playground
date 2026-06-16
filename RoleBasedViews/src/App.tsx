import axios, { Axios } from "axios";
import { toast } from "./Toastify/toast";
import ToastContainer from "./Toastify/ToastContainer";
import { snack } from "./Snackbar/useSnackbar";
import { SnackbarContainer } from "./Snackbar/SnackbarContainer";


interface AxiosResponse {
  success: true,
  data: any,
  message: string
}

const clientAPI = axios.create({
  baseURL: "http://localhost:5173/",
  timeout: 3000
})
const MyComponent = () => {

  const handleSubmit = async () => {
    snack.success("Success");
  };

  return <div>
    <button onClick={handleSubmit}>Submit</button>
    <SnackbarContainer />
  </div>;
};

export default MyComponent;