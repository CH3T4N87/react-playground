import Button from "@/components/Button/Button"
import Modal from "@/components/Modal/Modal"
import styles from "./RestoreOrganization.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useRestoreOrganizationMutation } from "@/redux/slices/orgApiSlice";
import { snack } from "@/components/Snackbar/useSnackbarStore";

const RestoreOrganization = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [restoreOrganization, { isLoading: isRestoring }] = useRestoreOrganizationMutation();
    const onDelete = async () => {
        try {
            const response = await restoreOrganization(id ? id : "").unwrap();
            snack.success(response.message || "Organization archived successfully!");
            navigate(-1);
        } catch (e: any) {
            snack.error(e?.data?.detail || e?.message || "Something went wrong!");
            console.error("Organization deletion error:", e);
        }
    }
    return (
        <Modal>
            <div>
                <span>Are you sure you want restore?</span>
                <div className={styles.btnContainer}>
                    <Button variant="primary" onClick={onDelete}>{isRestoring ? "Restoring..." : "Restore"}</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default RestoreOrganization