// const ProtectedRoute = ({ allowedRoles, component: Component, ...rest }) => {
//   const { role } = user;

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Route {...rest} element={<Component />} />;
// };

// <ProtectedRoute path="/admin" allowedRoles={['admin', 'superuser']} component={AdminPanel} />
// <ProtectedRoute path="/user" allowedRoles={['user', 'admin']} component={UserPanel} /> 


// const RequireRole = ({ roles, children }) => {
//   const { userRole } = useAuth();

//   if (!roles.includes(userRole)) {
//     return null; // Or a fallback UI
//   }

//   return children;
// };

// // Usage inside a component
// <RequireRole roles={['admin']}>
//   <DeleteButton />
// </RequireRole>   

// export const rolePermissions = {
//   admin: ['view_all', 'delete_user', 'edit_config'],
//   user: ['view_own', 'edit_profile'],
//   guest: ['view_public']
// };

// // Usage
// const hasPermission = (permission) => 
//   rolePermissions[userRole]?.includes(permission);

// {hasPermission('delete_user') && <AdminSettings />}   