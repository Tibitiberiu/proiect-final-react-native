import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { TextContainer, TextTitle } from "./Components";
import { GameStatus } from "../hooks/gameContext";

const Container = styled.TouchableOpacity`
    padding: 15px;
    border: 1px solid black;
    border-radius: 4px;
    margin-bottom: 4px;
`

export interface IGameListItem {
    id: string;
    onPress?: () => void;
    status: string;
    winner: string;
}

const GameListItem: React.FC<IGameListItem> = ({id, status, winner, onPress}) => {
    return (
        <Container color="green" onPress={onPress}>
            <TextContainer>
                <TextTitle>Game ID:</TextTitle>
                <Text>{id}</Text>
            </TextContainer>
            <TextContainer>
                <TextTitle>Status: </TextTitle>
                <Text>{status}</Text>
            </TextContainer>
            { status === GameStatus.FINISHED ? 
                    <TextContainer>
                        <TextTitle>Winner: </TextTitle>
                        <Text>{winner}</Text>
                    </TextContainer>
                    : null
                }
        </Container>
    )
}

export default GameListItem