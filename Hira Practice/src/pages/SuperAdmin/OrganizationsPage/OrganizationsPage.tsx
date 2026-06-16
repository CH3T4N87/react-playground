import { useState } from "react";
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import Loader from "@/components/Loader/Loader";
import AddOrganizationPage from "@/pages/SuperAdmin/AddOrganizationPage/AddOrganizationPage";
import DeleteOrganization from "@/pages/SuperAdmin/DeleteOrganization/DeleteOrganization";
import styles from "./OrganizationsPage.module.scss";
import { useGetOrganizationsQuery } from "@/redux/slices/orgApiSlice";

type ModalState =
  | { type: "add" }
  | { type: "update"; id: string }
  | { type: "delete"; id: string }
  | null;

const OrganizationsPage = () => {
  const [modal, setModal] = useState<ModalState>(null);
  let { data, isFetching } = useGetOrganizationsQuery(undefined);
  data = [
    {
      organization_id: "string",
      organization_name: "acc",
      org_admin_name: "string",
      org_admin_email: "string",
      subscription_name: "BASIC"
    }
  ]
  const closeModal = () => setModal(null);

  return (
    <div className={styles.organizationsPage}>

      {/* Modals — rendered on top of the page when open */}
      {modal?.type === "add" && (
        <AddOrganizationPage onClose={closeModal} />
      )}
      {modal?.type === "update" && (
        <AddOrganizationPage id={modal.id} onClose={closeModal} />
      )}
      {modal?.type === "delete" && (
        <DeleteOrganization id={modal.id} onClose={closeModal} />
      )}

      {/* Page content */}
      <div className={styles.orgActionsContainer}>
        <SearchBar />
        <Button variant="primary" onClick={() => setModal({ type: "add" })}>
          + ADD
        </Button>
      </div>

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
                  variant="outline-secondary"
                  onClick={() => setModal({ type: "update", id: organization.organization_id! })}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-tertiary"
                  onClick={() => setModal({ type: "delete", id: organization.organization_id! })}
                >
                  Delete
                </Button>
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table>
    </div>
  );
};

export default OrganizationsPage;