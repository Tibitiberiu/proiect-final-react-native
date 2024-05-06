import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo, login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserDetails {
    user: {id: string, email: string};
    gamesPlayed: number;
    gamesLost: number;
    gamesWon: number;
    currentlyGamesPlaying: number;
}

interface IAuthContext {
    token: string;
    user_details: IUserDetails;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean,
    error: {type: string, message: string},
}

const AuthContext = createContext<IAuthContext>({
    token: '',
    user_details: {
        user: {
            id: '', 
            email: '',
        },
        gamesPlayed: -1,
        gamesLost: -1,
        gamesWon: -1,
        currentlyGamesPlaying: -1,
    },
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    isLoading: false,
    error: {type: "", message: ""},
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{type: string, message: string}>({type: '', message: ''});
    const [user_details, setUserDetails] = useState<IUserDetails>({user: {
                                                                        id: '', 
                                                                        email: '',
                                                                    },
                                                                    gamesPlayed: -1,
                                                                    gamesLost: -1,
                                                                    gamesWon: -1,
                                                                    currentlyGamesPlaying: -1,
                                                                });
    useEffect(() => {
        setIsLoading(true) 
        AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                setToken(value)
            }
        })
        AsyncStorage.getItem('userDetails')
        .then(value => {
            if (value !== null) {
                setUserDetails(JSON.parse(value))
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
                const result2 = await getUserInfo(result);
                if(result2) { 
                    setUserDetails(result2);
                    await AsyncStorage.setItem('userDetails', JSON.stringify(result2));
                }
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
                const result2 = await getUserInfo(result);
                if(result2) { 
                    setUserDetails(result2);
                    await AsyncStorage.setItem('userDetails', JSON.stringify(result2));
                }
            } else {
                setError({type: "register", message: "Wrong email!"});
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleLogOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userDetails');
        setToken('');
        setUserDetails({user: {
                        id: '', 
                        email: '',
                    },
                    gamesPlayed: -1,
                    gamesLost: -1,
                    gamesWon: -1,
                    currentlyGamesPlaying: -1,
                });
    };
    return (
        <AuthContext.Provider value={{
            token,
            user_details,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogOut,
            isLoading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
