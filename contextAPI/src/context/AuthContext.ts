// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // Rehydrate from localStorage on app load
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");
//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("token", authToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook for easy access
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }



// import { AuthProvider } from "./AuthContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );


// import { useAuth } from "./AuthContext";

// function LoginPage() {
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/auth/login", { method: "POST", body: ... });
//     const { user, token } = await res.json();
//     login(user, token); // saves to state + localStorage
//   };
//   // ...
// }



// import { useAuth } from "./AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();
//   return <div>Hello, {user?.name} <button onClick={logout}>Log out</button></div>;
// }