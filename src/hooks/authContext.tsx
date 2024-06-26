import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo, joinGame, login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from "@react-navigation/native";

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
    register: (email: string, password: string, navigation: NavigationProp<any>) => Promise<void>;
    logout: () => Promise<void>;
    setIsLoading: (loading: boolean) => void;
    setIsInGame: (status: string) => Promise<void>;
    setIsInGameReload: (gameId: string) => Promise<void>;
    joinGame: (gameId: string) => Promise<void>;
    updateData: () => Promise<void>;
    isLoading: boolean,
    isInGame: string,
    isInGameReload: string,
    error: {type: string, message: string, success: boolean},
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
    setIsLoading: (loading: boolean) => {},
    setIsInGame: async (isInGame: string) => {},
    setIsInGameReload: async (gameId: string) => {},
    joinGame: async (gameId: string) => {},
    updateData: async () => {},
    isLoading: false,
    isInGame: "",
    isInGameReload: "",
    error: {type: "", message: "", success: false},
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [isInGame, setIsInGame] = useState<string>("");
    const [isInGameReload, setIsInGameReload] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{type: string, message: string, success: boolean}>({type: '', message: '', success: false});
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
        // setIsLoading(true) 
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
        // .finally(() => {setIsLoading(false)})
    }, []);
    const handleUpdateData = async () => {
        const result = await getUserInfo(token);
        if(result) { 
            setUserDetails(result);
            await AsyncStorage.setItem('userDetails', JSON.stringify(result));
        }
    }
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
                setError({type: '', message: '', success: false});
            } else {
                setError({type: "login", message: "Wrong email / password!", success: false});
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleRegister = async (email: string, password: string, navigation: NavigationProp<any>) => {
        try {
            const result = await register(email, password);
            if(result) { 
                setError({type: "login", message: "Registered successfully! You can login with your account now.", success: true});
                navigation.goBack();
            } else {
                setError({type: "register", message: "Wrong email!", success: false});
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
        setError({type: 'login', message: 'Log out successfully!', success: true});
    };
    const handleIsLoading = (loading: boolean) => {
       setIsLoading(loading);
    };
    const handleIsInGame = async (status: string) => {
        setIsInGame(status);
    };
    const handleIsInGameReload = async (gameId: string) => {
        setIsInGameReload(gameId);
    };
    const handleJoinGame = async(gameId: string) => {
        const result = await joinGame(token, gameId);
        setIsInGame(result.id);
    }
    return (
        <AuthContext.Provider value={{
            token,
            user_details,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogOut,
            setIsLoading: handleIsLoading,
            setIsInGame: handleIsInGame,
            setIsInGameReload: handleIsInGameReload,
            joinGame: handleJoinGame,
            updateData: handleUpdateData,
            isInGame,
            isInGameReload,
            isLoading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
