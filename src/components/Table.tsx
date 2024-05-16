import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { Button, ButtonContainer, ButtonText, Cell, Container, Row, TableContainer, TextContainer, TextTitle } from './Components';
import { useAuth } from '../hooks/authContext';


const Table: React.FC = () => {
    const auth = useAuth();
    const handleBack = () => auth.setIsInGame("");


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ width: "95%" }}>
                <TextContainer style={{justifyContent: 'center'}}>
                    <TextTitle>Game ID:</TextTitle>
                    <Text>{auth.isInGame}</Text>
                </TextContainer>
                <TableContainer>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                    <Row>
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                        <Cell />
                    </Row>
                </TableContainer>
                <ButtonContainer>
                <Button onPress={handleBack}>
                    <ButtonText>Forfeit</ButtonText>
                </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    );
};

export default Table;