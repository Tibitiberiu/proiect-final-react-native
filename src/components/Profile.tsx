import React, {useEffect, useState} from "react";
import { SafeAreaView, Text } from "react-native";
import { useAuth } from "../hooks/authContext";
import { Button, ButtonContainerProfile, ButtonText, Container, Separator, TextContainer, TextTitle, TextTitleCentered, Title } from "./Components";



const Profile: React.FC<any> = () => {
    const auth = useAuth();
    useEffect(() => {
        auth.updateData();
    }, []);
    const handleSubmit = () => auth.logout()
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Profile</Title>
                <Separator />
                <TextTitleCentered>Personal data</TextTitleCentered>
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
                    <Text>{auth.user_details.gamesPlayed - auth.user_details.gamesWon}</Text>
                </TextContainer>
                <TextContainer>
                    <TextTitle>Win/Loss Rate:</TextTitle>
                    <Text>{(Number(auth.user_details.gamesWon) / Number(auth.user_details.gamesPlayed - auth.user_details.gamesWon)).toFixed(2)}</Text>
                </TextContainer>

                <Separator />
                <ButtonContainerProfile>
                    <Button onPress={handleSubmit}>
                        <ButtonText>Log Out</ButtonText>
                    </Button>
                </ButtonContainerProfile>
            </Container>
        </SafeAreaView>
    )
}

export default Profile;