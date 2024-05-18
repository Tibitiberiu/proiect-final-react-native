import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { AlertContainerError, AlertContainerSuccess, AlertTextError, AlertTextSuccess, Button, ButtonContainer, ButtonText, Cell, Container, Row, TableContainer, TextContainer, TextTitle } from './Components';
import { useAuth } from '../hooks/authContext';
import { GameStatus, useGameContext } from '../hooks/gameContext';


const TablePlay: React.FC = () => {
    const auth = useAuth();
    const gameCtx = useGameContext();
    const handleBack = () => auth.setIsInGame("");
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ width: "95%" }}>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Game ID:</TextTitle>
                    <Text>{auth.isInGame}</Text>
                </TextContainer>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Game Phase:</TextTitle>
                    <Text>{gameCtx.game?.status}</Text>
                </TextContainer>
                {gameCtx.game && gameCtx.game.status === GameStatus.FINISHED && auth.user_details.user.id !== gameCtx.game.playerToMoveId ? 
                    <AlertContainerSuccess>
                        <AlertTextSuccess width="100%" textAlign="center"><TextTitle>Congratulation! You won the game!</TextTitle></AlertTextSuccess>
                    </AlertContainerSuccess>
                    : null
                }
                {gameCtx.game && gameCtx.game.status === GameStatus.FINISHED && auth.user_details.user.id === gameCtx.game.playerToMoveId ? 
                    <AlertContainerError>
                        <AlertTextError width="100%" textAlign="center"><TextTitle>Sorry! You lost the game!</TextTitle></AlertTextError>
                    </AlertContainerError>
                    : null
                }
                <TableContainer>
                {
                      gameCtx.strikeTableState.map((line, index) => (
                        <Row key={index}>
                            {
                                line.map(({row, column, value}) => (
                                        <Cell style={{ backgroundColor: value == -1 ? 'red' : (value == 0 ? 'none' : 'green') }} row = {row} key = {column} onPress={() => {
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
                <ButtonContainer>
                    <Button onPress={handleBack}>
                        <ButtonText>Forfeit</ButtonText>
                    </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
};

export default TablePlay;