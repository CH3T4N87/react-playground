import Loader from "@/components/Loader/Loader";
import Table from "@/components/Table/Table";
import { useGetArchivedOrganizationsQuery } from "@/redux/slices/orgApiSlice"
import styles from "./ArchivedOrganizations.module.scss";
import Button from "@/components/Button/Button";
import { Outlet, useNavigate } from "react-router-dom";


const ArchivedOrganizations = () => {
    const navigate = useNavigate();
    const { data, isFetching } = useGetArchivedOrganizationsQuery(undefined);

    if (!data) <div>No data right now......</div>
    return (
        <div>
            <Outlet/>
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
                                <Button variant="outline-success" onClick={() => navigate(`restore/${organization.organization_id}`)}>Restore</Button>
                            </Table.TableCell>
                        </Table.TableRow>)
                    }
                </Table.TableBody>
            </Table>
        </div>
    )
}

export default ArchivedOrganizations