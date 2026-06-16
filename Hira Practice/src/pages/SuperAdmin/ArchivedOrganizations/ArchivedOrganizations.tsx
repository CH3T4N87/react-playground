import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Table from "@/components/Table/Table";
import Button from "@/components/Button/Button";
import RestoreOrganization from "@/pages/SuperAdmin/RestoreOrganization/RestoreOrganization";
import styles from "./ArchivedOrganizations.module.scss";
import { useGetArchivedOrganizationsQuery } from "@/redux/slices/orgApiSlice";

type ModalState =
    | { type: "restore"; id: string }
    | null;

const ArchivedOrganizations = () => {
    const [modal, setModal] = useState<ModalState>(null);
    const { data, isFetching } = useGetArchivedOrganizationsQuery(undefined);

    const closeModal = () => setModal(null);

    if (!isFetching && !data?.length) {
        return <div>No archived organizations right now...</div>;
    }

    return (
        <div>
            {/* Modal */}
            {modal?.type === "restore" && (
                <RestoreOrganization id={modal.id} onClose={closeModal} />
            )}

            {isFetching && <Loader />}

            <Table>
                <Table.TableHead>
                    <Table.TableRow>
                        <Table.TableHeadCell>Organization Name</Table.TableHeadCell>
                        <Table.TableHeadCell>Admin Name</Table.TableHeadCell>
                        <Table.TableHeadCell>Admin Email</Table.TableHeadCell>
                        <Table.TableHeadCell>Subscription Model</Table.TableHeadCell>
                        <Table.TableHeadCell>Actions</Table.TableHeadCell>
                    </Table.TableRow>
                </Table.TableHead>
                <Table.TableBody>
                    {data?.map((organization) => (
                        <Table.TableRow key={organization.organization_id}>
                            <Table.TableCell>{organization.organization_name}</Table.TableCell>
                            <Table.TableCell>{organization.org_admin_name}</Table.TableCell>
                            <Table.TableCell>{organization.org_admin_email}</Table.TableCell>
                            <Table.TableCell>{organization.subscription_name}</Table.TableCell>
                            <Table.TableCell className={styles.actionBtnCell}>
                                <Button
                                    variant="outline-success"
                                    onClick={() => setModal({ type: "restore", id: organization.organization_id! })}
                                >
                                    Restore
                                </Button>
                            </Table.TableCell>
                        </Table.TableRow>
                    ))}
                </Table.TableBody>
            </Table>
        </div>
    );
};

export default ArchivedOrganizations;