import React from "react";

const Auth = React.createContext(null);

// eslint-disable-next-line react/prop-types
function AuthProvider({children}){
    const [user, setUser] = React.useState(null);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <Auth.Provider value={{user, login, logout}}>
            {children}
        </Auth.Provider>
    )
}

export default AuthProvider


export const useAuth = () => {
    return React.useContext(Auth);
}