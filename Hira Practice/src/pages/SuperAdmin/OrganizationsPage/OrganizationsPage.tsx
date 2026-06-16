import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import styles from "./OrganizationsPage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetOrganizationsQuery } from "@/redux/slices/orgApiSlice";
import Loader from "@/components/Loader/Loader";

const OrganizationsPage = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetOrganizationsQuery(undefined);
  return (
    <div className={styles.organizationsPage}>
      <Outlet />
      <div className={styles.orgActionsContainer}>
        <SearchBar />
        <Button variant="primary" onClick={() => navigate("add")}>+ ADD</Button>
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
          {
            data?.map(organization => <Table.TableRow key={organization.organization_id}>
              <Table.TableCell>{organization.organization_name}</Table.TableCell>
              <Table.TableCell>{organization.org_admin_name}</Table.TableCell>
              <Table.TableCell>{organization.org_admin_email}</Table.TableCell>
              <Table.TableCell>{organization.subscription_name}</Table.TableCell>
              <Table.TableCell className={styles.actionBtnCell}>
                <Button variant="outline-secondary" onClick={() => navigate(`update/${organization.organization_id}`)}>Edit</Button>
                <Button variant="outline-tertiary" onClick={() => navigate(`delete/${organization.organization_id}`)}>Delete</Button>
              </Table.TableCell>
            </Table.TableRow>)
          }
        </Table.TableBody>
      </Table>
    </div>
  )
}

export default OrganizationsPage




