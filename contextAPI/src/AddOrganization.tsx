// import { useEffect } from "react";
// import Modal from "@/components/Modal/Modal";
// import { FormProvider, useForm } from "react-hook-form";
// import type { AddOrganizationPageProps, OrganizationData } from "./AddOrganizationPage.types";
// import { snack } from "@/components/Snackbar/useSnackbarStore";
// import FormInput from "@/components/Form/FormInput/FormInput";
// import { MultiClass } from "@/utility/classResolve";
// import styles from "./AddOrganizationPage.module.scss";
// import Button from "@/components/Button/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import FormSelect from "@/components/Form/FormSelect/FormSelect";
// import {
//   useCreateOrganizationMutation,
//   useUpdateOrganizationMutation,
//   useGetOrganizationQuery,
// } from "@/redux/slices/orgApiSlice";

// const AddOrganizationPage = ({ isEditingMode: propIsEditingMode = false }: AddOrganizationPageProps) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
  
//   const isEditingMode = Boolean(id);
  
//   // Queries and mutations
//   const { data: organizationData, isFetching, isLoading: isFetchingData } = useGetOrganizationQuery(id || "", {
//     skip: !id, // Skip query if no id
//   });
  
//   const [createOrganization, { isLoading: isCreating }] = useCreateOrganizationMutation();
//   const [updateOrganization, { isLoading: isUpdating }] = useUpdateOrganizationMutation();
  
//   const isSubmitting = isCreating || isUpdating;
//   const isLoadingForm = isFetching || isFetchingData;

//   // Default values for the form
//   const defaultValues: OrganizationData = {
//     organization_name: "",
//     org_admin_name: "",
//     org_admin_email: "",
//     subscription_name: "BASIC",
//   };

//   const methods = useForm<OrganizationData>({
//     defaultValues,
//     mode: "onBlur",
//   });

//   // Populate form with existing data when editing
//   useEffect(() => {
//     if (isEditingMode && organizationData) {
//       methods.reset({
//         organization_name: organizationData.organization_name || "",
//         org_admin_name: organizationData.org_admin_name || "",
//         org_admin_email: organizationData.org_admin_email || "",
//         subscription_name: organizationData.subscription_name || "BASIC",
//       });
//     }
//   }, [isEditingMode, organizationData, methods]);

//   const onSubmit = async (orgData: OrganizationData) => {
//     try {
//       if (isEditingMode && id) {
//         // Update existing organization
//         const response = await updateOrganization({
//           id,
//           ...orgData,
//         }).unwrap();
//         snack.success(response.message || "Organization updated successfully!");
//       } else {
//         // Create new organization
//         const response = await createOrganization(orgData).unwrap();
//         snack.success(response.message || "Organization created successfully!");
//       }
      
//       // Navigate back after successful submission
//       navigate(-1);
//     } catch (error: any) {
//       const errorMessage = error?.data?.detail || error?.message || "Something went wrong!";
//       snack.error(errorMessage);
//       console.error("Organization submission error:", error);
//     }
//   };

//   const pageTitle = isEditingMode ? "Edit Organization" : "Add Organization";
//   const submitButtonText = isSubmitting
//     ? isEditingMode
//       ? "Updating..."
//       : "Creating..."
//     : isEditingMode
//     ? "Update"
//     : "Create";

//   return (
//     <Modal title={pageTitle}>
//       {isLoadingForm && (
//         <div className={styles.loadingState}>
//           <p>Loading organization details...</p>
//         </div>
//       )}

//       {!isLoadingForm && (
//         <FormProvider {...methods}>
//           <form
//             onSubmit={methods.handleSubmit(onSubmit)}
//             className={MultiClass([styles.form, styles.addOrgForm])}
//             noValidate
//           >
//             <FormInput<OrganizationData>
//               name="organization_name"
//               placeholder="Enter organization name here..."
//               label="Organization Name"
//               disabled={isSubmitting}
//               rules={{
//                 required: "Organization name is required",
//                 minLength: {
//                   value: 2,
//                   message: "Organization name must be at least 2 characters",
//                 },
//                 maxLength: {
//                   value: 100,
//                   message: "Organization name must not exceed 100 characters",
//                 },
//               }}
//             />

//             <FormInput<OrganizationData>
//               name="org_admin_name"
//               placeholder="Enter organization admin name here..."
//               label="Organization Admin Name"
//               disabled={isSubmitting}
//               rules={{
//                 required: "Admin name is required",
//                 minLength: {
//                   value: 2,
//                   message: "Admin name must be at least 2 characters",
//                 },
//               }}
//             />

//             <FormInput<OrganizationData>
//               name="org_admin_email"
//               placeholder="Enter organization admin email here..."
//               label="Organization Admin Email"
//               type="email"
//               disabled={isSubmitting}
//               rules={{
//                 required: "Admin email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Please enter a valid email address",
//                 },
//               }}
//             />

//             <FormSelect<OrganizationData>
//               name="subscription_name"
//               label="Subscription Type"
//               disabled={isSubmitting}
//               options={[
//                 {
//                   label: "Basic Features",
//                   value: "BASIC",
//                 },
//                 {
//                   label: "Half Features",
//                   value: "HALF",
//                 },
//                 {
//                   label: "Full Features",
//                   value: "FULL",
//                 },
//               ]}
//               rules={{
//                 required: "Please select a subscription type",
//               }}
//             />

//             <div className={styles.formButtonsContainer}>
//               <Button
//                 variant="primary"
//                 type="submit"
//                 disabled={isSubmitting || isLoadingForm}
//               >
//                 {submitButtonText}
//               </Button>
//               <Button
//                 onClick={() => navigate(-1)}
//                 type="button"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </FormProvider>
//       )}
//     </Modal>
//   );
// };

// export default AddOrganizationPage;