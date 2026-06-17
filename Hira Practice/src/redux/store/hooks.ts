// store/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();



// // App.tsx
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './store/hooks';
// import { restoreSession } from './slices/authSlice';

// function App() {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(restoreSession()); // Restore session on app load
//   }, []);

//   // Your app...
// }





// Before (with Context)
    // import { useAuth } from './context/AuthContext';
    // const { user, login, logout } = useAuth();

    // // After (with Redux)
    // import { useAppDispatch, useAppSelector } from './store/hooks';
    // import { login, logout } from './slices/authSlice';

    // const dispatch = useAppDispatch();
    // const user = useAppSelector((state) => state.auth.user);

    // // Login
    // dispatch(login({ user: userData, token: authToken }));

    // // Logout
    // dispatch(logout());