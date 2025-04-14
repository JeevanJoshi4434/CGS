import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userToken, userId) => {
        setToken(userToken);
        setId(userId);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setToken(null);
        setId(null);
        setIsLoggedIn(false);
    };

    return (
        <SessionContext.Provider value={{ token, id, isLoggedIn, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom hook for easier usage
export const useSession = () => useContext(SessionContext);
