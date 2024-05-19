import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { AlertContainerError, AlertContainerSuccess, AlertTextError, AlertTextSuccess, Button, ButtonContainer, ButtonText, Cell, Container, Row, Separator, TableContainer, TextBorder, TextContainer, TextTitle } from './Components';
import { useAuth } from '../hooks/authContext';
import { GameStatus, useGameContext } from '../hooks/gameContext';
import { useRoute } from '@react-navigation/native';
import { getGameInfo } from '../api';


const TablePlay: React.FC = () => {
    const auth = useAuth();
    const gameCtx = useGameContext();
    const handleBack = () => {
        auth.setIsInGameReload("");
        auth.setIsInGame("");
    }

    const [NMoves, setNMoves] = useState<number>(0);
    useEffect(() => {
        gameCtx.sendReloadMove(NMoves);
    }, [NMoves])
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ paddingTop: 5, width: "95%" }}>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Game ID:</TextTitle>
                    <Text>{auth.isInGameReload}</Text>
                </TextContainer>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Winner ID:</TextTitle>
                    <Text>{gameCtx.game?.playerToMoveId}</Text>
                </TextContainer>
                <Separator />
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Player 1:</TextTitle>
                    <Text>{gameCtx.game?.player1Id}</Text>
                </TextContainer>
                <TableContainer>
                {
                      gameCtx.reloadTableState1.map((line, index) => (
                        <Row key={index}>
                            {
                                line.map(({row, column, value}) => (
                                        <Cell style={{ width: 20, height: 20, backgroundColor: value == -1 ? 'red' : (value == 0 ? 'none' : 'green') }} row = {row} key = {column} onPress={() => {
                                            try{
                                                gameCtx.sendMove(row, column);
                                            } catch(e) {
                                                console.log(e);
                                            }
                                        }}/> 
                                    )  
                                )
                            }
                        </Row>
                    ))
                }
                </TableContainer>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Player 2:</TextTitle>
                    <Text>{gameCtx.game?.player2Id}</Text>
                </TextContainer>
                <TableContainer>
                {
                      gameCtx.reloadTableState2.map((line, index) => (
                        <Row key={index}>
                            {
                                line.map(({row, column, value}) => (
                                        <Cell style={{ width: 20, height: 20, backgroundColor: value == -1 ? 'red' : (value == 0 ? 'none' : 'green') }} row = {row} key = {column} onPress={() => {
                                            try{
                                                gameCtx.sendMove(row, column);
                                            } catch(e) {
                                                console.log(e);
                                            }
                                        }}/> 
                                    )  
                                )
                            }
                        </Row>
                    ))
                }
                </TableContainer>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Number of moves shown:</TextTitle>
                    <Text style={{paddingRight: 5}}> {NMoves}</Text>
                    {gameCtx.game && NMoves < gameCtx.game?.moves.length ? <TextBorder onPress={() => setNMoves(NMoves + 1)}> + </TextBorder> : null}
                </TextContainer>
            <ButtonContainer style={{paddingTop: 0}}>
                <Button onPress={handleBack}>
                    <ButtonText>Go to homepage</ButtonText>
                </Button>
            </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
};

export default TablePlay;