import React, {useState} from "react";
import styled from "styled-components/native";
import { Alert, SafeAreaView, Text } from "react-native";
import { useAuth } from "../hooks/authContext";

const Container = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 10px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 20px;
`
const TextContainer = styled.View`
    display: flex;
    flex-direction: row;
    gap: 2px;
`
const ButtonContainer = styled.View`
    align-items: center;
    gap: 10px;
    paddingTop: 10px;
`

const Button = styled.Pressable`
    background-color: #c53030;
    height: 45px;
    width: 200px;
    border-color: gray;
    border-width: 1px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;
const Title = styled.Text`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    paddingBottom: 10px;
`
const TextTitle = styled.Text`
    font-weight: bold;
`
const TextTitleCentered = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`
const Separator = styled.View`
    borderBottomColor: #CCCCCC;
    borderBottomWidth: 1;
    marginVertical: 10;
`

const Profile: React.FC<any> = () => {
    const auth = useAuth();
    const handleSubmit = () => auth.logout()
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Profile</Title>
                <Separator />
                <TextTitleCentered>User data</TextTitleCentered>
                <TextContainer>
                    <TextTitle>ID:</TextTitle>
                    <Text>{auth.user_details.user.id}</Text>
                </TextContainer>
                <TextContainer>
                    <TextTitle>Email:</TextTitle>
                    <Text> {auth.user_details.user.email} </Text>
                </TextContainer>
                <Separator />
                <TextTitleCentered>Game statistics</TextTitleCentered>

                <TextContainer>
                    <TextTitle>Played games:</TextTitle>
                    <Text>{auth.user_details.gamesPlayed}</Text>
                </TextContainer>
                <TextContainer>
                    <TextTitle>Won Games:</TextTitle>
                    <Text>{auth.user_details.gamesWon}</Text>
                </TextContainer>
                <TextContainer>
                    <TextTitle>Lost Games:</TextTitle>
                    <Text>{auth.user_details.gamesLost}</Text>
                </TextContainer>
                <TextContainer>
                    <TextTitle>Win/Loss Rate:</TextTitle>
                    <Text>{(Number(auth.user_details.gamesWon) / Number(auth.user_details.gamesLost)).toFixed(2)}</Text>
                </TextContainer>

                <Separator />
                <ButtonContainer>
                    <Button onPress={handleSubmit}>
                        <ButtonText>Log Out</ButtonText>
                    </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
}

export default Profile;