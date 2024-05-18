import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { AlertContainerError, AlertContainerSuccess, AlertTextError, AlertTextSuccess, Button, ButtonContainer, ButtonText, Cell, Container, Row, TableContainer, TextContainer, TextTitle } from './Components';
import { useAuth } from '../hooks/authContext';
import { GameStatus, useGameContext } from '../hooks/gameContext';
import { useRoute } from '@react-navigation/native';
import { getGameInfo } from '../api';


const TablePlay: React.FC = () => {
    const auth = useAuth();
    const game = useGameContext();
    const handleBack = () => {
        auth.setIsInGameReload("");
        auth.setIsInGame("");
    }
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ width: "95%" }}>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Game ID:</TextTitle>
                    <Text>{auth.isInGameReload}</Text>
                </TextContainer>
            </Container>
        </SafeAreaView>
    )
};

export default TablePlay;