// 'use client';

// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);

//     const login = (token) => {
//         localStorage.setItem('x-auth-token', token);
//         setUser({ token });
//     };

//     const logout = () => {
//         localStorage.removeItem('x-auth-token');
//         setUser(null);
//     };

//     const isAuthenticated = !!user;

//     return (
//         <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     return useContext(AuthContext);
// }
