import React, {useState} from "react";
import styled from "styled-components/native";
import { SafeAreaView, Text } from "react-native";
import { Container, Separator, Title } from "./Components";

const Homepage: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Homepage</Title>
                <Separator />
                <Text>Available Games:</Text>
            </Container>
        </SafeAreaView>
    )
}

export default Homepage;