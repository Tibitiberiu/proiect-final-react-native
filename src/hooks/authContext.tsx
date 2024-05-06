import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
    token: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean,
    error: {type: string, message: string},
}

const AuthContext = createContext<IAuthContext>({
    token: '',
    login: async () => {},
    register: async () => {},
    isLoading: false,
    error: {type: "", message: ""},
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{type: string, message: string}>({type: '', message: ''});

    useEffect(() => {
        setIsLoading(true) 
        AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                setToken(value)
            }
        })
        .finally(() => {setIsLoading(false)})
    }, []);
    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            if(result) { 
                setToken(result);
                await AsyncStorage.setItem('token', result);
            } else {
                setError({type: "login", message: "Wrong email / password!"});
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            if(result) { 
                setToken(result);
                await AsyncStorage.setItem('token', result);
            } else {
                setError({type: "register", message: "Wrong email!"});
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            login: handleLogin,
            register: handleRegister,
            isLoading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
