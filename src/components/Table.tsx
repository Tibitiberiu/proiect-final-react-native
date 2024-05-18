import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, ButtonContainer, ButtonText, Cell, Container, Row, SelectorContainer, TableContainer, TextContainer, TextTitle } from './Components';
import { useAuth } from '../hooks/authContext';
import { ICell, ShipDirection, ShipSize, TableColumns, TableRows, useGameContext, Ship } from '../hooks/gameContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

interface ITable {
    state: ICell[][];
    onClick: (cellRow: TableRows, cellColumn: TableColumns) => Promise<any>;
}

const Table: React.FC<ITable> = ({state, onClick}) => {
    const auth = useAuth();
    const gameCtx = useGameContext();
    const [shipDirection, setShipDirection] = useState<ShipDirection>(ShipDirection.VERTICAL);
    const [shipSize, setShipSize] = useState<ShipSize | null>(6);
    const [menuItems, setMenuItems] = useState<number[]>([0, 0, 0, 0]);
    const [shipList, setShipList] = useState<Ship[] | null>(null);
    const addShip = (newShip: Ship) => {
        //console.log(shipList)
        if (shipList) {
          setShipList([...shipList, newShip]);
        } else {
          setShipList([newShip]);
        }
    };
    useEffect(() => {
        //console.log(shipList);
        if(menuItems.toString() === [1, 2, 3, 4].toString() && shipList != null){
            //console.log("test")
            gameCtx.sendGameConfiguration(shipList);
            //console.log("data sent");
        }
    }, [shipList, shipSize]);
    const handleBack = () => auth.setIsInGame("");
    const sizeToNumber = {
        6: 0,
        4: 1,
        3: 2,
        2: 3,
      };
    const sizeToMaxValue = {
        6: 1,
        4: 2,
        3: 3,
        2: 4,
    }
    return (
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
                <TableContainer>
                {
                      state.map((line, index) => (
                        <Row key={index}>
                            {line.map(({row, column, value}) => (
                                <Cell style={{ backgroundColor: value ? 'red' : 'none' }} row = {row} key = {column} onPress={() => {
                                    if(shipSize != null){
                                        try {
                                            gameCtx.placeShip(row, column, shipSize, shipDirection)
                                            addShip({x: row, y: column, size: shipSize, direction: shipDirection})
                                            const newMenuItems = Array.from({ length: 4 }, (_, i) => {
                                                if(sizeToNumber[shipSize] === i){
                                                    if(menuItems[i] + 1 === sizeToMaxValue[shipSize]){
                                                        if(menuItems.toString() === [1, 2, 3, 4].toString()){
                                                            setShipSize(null);
                                                        } else {
                                                            if(menuItems[0] != 1){
                                                                setShipSize(6);
                                                            } else if(menuItems[1] != 2){
                                                                setShipSize(4);
                                                            } else if(menuItems[2] != 3) {
                                                                setShipSize(3);
                                                            } else if(menuItems[3] != 4) {
                                                                setShipSize(2);
                                                            }
                                                        }
                                                    }
                                                    return menuItems[i] + 1;
                                                } else {
                                                    return menuItems[i];
                                                }
                                            });
                                            console.log(newMenuItems);
                                            setMenuItems(newMenuItems)
                                        } catch(e) {

                                        }
                                        }
                                    }
                                }/>     
                            ))}
                        </Row>
                    ))
                }
                </TableContainer>
                {shipSize !== null ?
                    <View>
                        <SelectorContainer>
                            <TextTitle>Ship:</TextTitle>
                            <Picker 
                                selectedValue={shipSize} 
                                style={{ height: 10, width: 208}} 
                                mode={"dialog"} 
                                onValueChange={(itemValue) => setShipSize(itemValue)} 
                                > 
                                {menuItems[0] <= 1 ? <Picker.Item label="Aircraft Carrier (6)" value = {6} /> : null }
                                {menuItems[1] <= 2 ? <Picker.Item label="Battleship (4)" value = {4} /> : null }
                                {menuItems[2] <= 3 ? <Picker.Item label="Cruiser (3)" value = {3} /> : null }
                                {menuItems[3] <= 4 ? <Picker.Item label="Destroyer (2)" value = {2} /> : null }
                            </Picker> 
                        </SelectorContainer>
                        <SelectorContainer>
                            <TextTitle>Ship direction:</TextTitle>
                            <Picker 
                                selectedValue={shipDirection} 
                                style={{ height: 10, width: 154}} 
                                mode={"dialog"} 
                                onValueChange={(itemValue) => setShipDirection(itemValue)} 
                                > 
                                <Picker.Item label="Vertical" value = {ShipDirection.VERTICAL} /> 
                                <Picker.Item label="Horizontal" value = {ShipDirection.HORIZONTAL} /> 
                            </Picker> 
                        </SelectorContainer>
                    </View>
                :   <View>
                        <Text style = {{textAlign: 'center', paddingBottom: 30}}>Waiting for opponent to select ship configuration...</Text>
                        <ActivityIndicator size="large"/>
                    </View>    
                }
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