import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import styles from "./RestoreOrganization.module.scss";
import { useRestoreOrganizationMutation } from "@/redux/slices/orgApiSlice";
import { snack } from "@/components/Snackbar/useSnackbarStore";

interface RestoreOrganizationProps {
    id: string;
    onClose: () => void;
}

const RestoreOrganization = ({ id, onClose }: RestoreOrganizationProps) => {
    const [restoreOrganization, { isLoading: isRestoring }] = useRestoreOrganizationMutation();

    const onRestore = async () => {
        try {
            const response = await restoreOrganization(id).unwrap();
            snack.success(response.message || "Organization restored successfully!");
            onClose();
        } catch (e: any) {
            snack.error(e?.data?.detail || e?.message || "Something went wrong!");
            console.error("Organization restore error:", e);
        }
    };

    return (
        <Modal>
            <div>
                <span>Are you sure you want to restore?</span>
                <div className={styles.btnContainer}>
                    <Button variant="primary" onClick={onRestore} disabled={isRestoring}>
                        {isRestoring ? "Restoring..." : "Restore"}
                    </Button>
                    <Button onClick={onClose} disabled={isRestoring}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RestoreOrganization;