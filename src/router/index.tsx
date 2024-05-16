import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import authRoutes from "./auth.router";
import { useAuth } from "../hooks/authContext";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import homepageRoutes from "./homepage.router";
import gameRoutes from "./game.router";

const Router: React.FC  = () => {
    const auth = useAuth();

    if (auth.isLoading) {
        return (
            <SafeAreaView style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
            <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }

    return (
        <NavigationContainer>
            {auth.token ? (auth.isInGame ? gameRoutes : homepageRoutes) : authRoutes}
        </NavigationContainer>
    )
}

export default Router;