import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { TextContainer, TextTitle } from "./Components";

const Container = styled.TouchableOpacity`
    padding: 15px;
    border: 1px solid black;
    border-radius: 4px;
    margin-bottom: 4px;
`

export interface IGameListItem {
    id: number;
    onPress?: () => void;
    status: string
}

const GameListItem: React.FC<IGameListItem> = ({id, status, onPress}) => {
    return (
        <Container color="green" onPress={onPress}>
            <TextContainer>
                <TextTitle>Game ID:</TextTitle>
                <Text> {id} </Text>
            </TextContainer>
            <TextContainer>
                <TextTitle>Status: </TextTitle>
                <Text> {status} </Text>
            </TextContainer>
        </Container>
    )
}

export default GameListItem