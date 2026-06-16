import Button from "@/components/Button/Button"
import Modal from "@/components/Modal/Modal"
import styles from "./DeleteOrganization.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteOrganizationMutation } from "@/redux/slices/orgApiSlice";
import { snack } from "@/components/Snackbar/useSnackbarStore";

const DeleteOrganization = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deleteOrganization, { isLoading: isDeleting }] = useDeleteOrganizationMutation();
    const onDelete = async () => {
        try {
            const response = await deleteOrganization(id ? id : "").unwrap();
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
                <span>Are you sure you want delete?</span>
                <div className={styles.btnContainer}>
                    <Button variant="tertiary" onClick={onDelete}>{isDeleting ? "Deleting..." : "Delete"}</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteOrganization