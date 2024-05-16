import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import { SafeAreaView, Text } from "react-native";
import { Button, ButtonContainer, ButtonText, Container, GameList, Separator, TextTitle, Title } from "./Components";
import { useAuth } from "../hooks/authContext";
import { createGame, listGames } from "../api";
import GameListItem from "./GameListItem";
import { useNavigation } from "@react-navigation/native";
import { GameRouteNames, HomepageRouteNames } from "../router/route-names";


const Homepage: React.FC = () => {

    const auth = useAuth();
    const [gamesNumber, setGamesNumber] = useState(0);
    const [games, setGames] = useState<any[]>([]);
    const navigation = useNavigation<any>();
    
    useEffect(() => {
        listGames(auth.token)
          .then(({ total, games }) => {
            setGames(games);
            setGamesNumber(total);
          })
          .catch(error => {
            console.error('Error fetching games:', error);
            // Setează isLoading pe false aici pentru a gestiona eroarea și a opri încărcarea.
          });
      }, []);
      
    const handleAddGame = async () => {
        await createGame(auth.token)
        .then(({ id }) => {
            auth.setIsInGame(id);
        })
        
        await listGames(auth.token)
        .then(({ total, games }) => {
          setGames(games);
          setGamesNumber(total);
        });
    }
    
    const handleTablePreview = () => {
        auth.setIsInGame("");
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Homepage</Title>
                <Separator />
                <TextTitle>Available Games ({gamesNumber}):</TextTitle>
                <GameList>
                    {games.map(game => (
                        <GameListItem status={game.status} id={game.id} key={game.id} onPress={() => { 
                            auth.setIsInGame(game.id);
                        }} />
                    ))}
                </GameList>
                <ButtonContainer>
                    <Button>
                        <ButtonText onPress={handleAddGame}>Create new game</ButtonText>
                    </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
}

export default Homepage;