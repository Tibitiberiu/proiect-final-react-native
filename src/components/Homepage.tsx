import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { Button, ButtonContainer, ButtonText, Container, GameList, Separator, TextTitle, Title } from "./Components";
import { useAuth } from "../hooks/authContext";
import { createGame, getGameInfo, listGames } from "../api";
import GameListItem from "./GameListItem";
import { useNavigation } from "@react-navigation/native";
import { AuthRouteNames, GameRouteNames, HomepageRouteNames } from "../router/route-names";
import { GameStatus } from "../hooks/gameContext";


const Homepage: React.FC = () => {

    const auth = useAuth();
    const [gamesNumber, setGamesNumber] = useState(0);
    const [games, setGames] = useState<any[]>([]);
    
    useEffect(() => {
        auth.setIsLoading(true)
        listGames(auth.token)
          .then(({ total, games }) => {
            setGames(games);
            setGamesNumber(total);
          })
          .catch(error => {
            console.error('Error fetching games:', error);
          })
          .finally(() => auth.setIsLoading(false));
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
                    {auth.isLoading ? <ActivityIndicator size="large" style = {{paddingTop: 20}} /> : null}
                    {
                    games.slice().reverse().map(game => (
                        <GameListItem status={game.status} winner={game.playerToMoveId} id={game.id} key={game.id} onPress={() => { 
                            if(game.status == GameStatus.FINISHED){
                                auth.setIsInGameReload(game.id);
                                auth.setIsInGame(game.id);
                            } else auth.joinGame(game.id);
                        }} />
                    ))}
                </GameList>
                {!auth.isLoading ? 
                    <ButtonContainer>
                        <Button>
                            <ButtonText onPress={handleAddGame}>Create new game</ButtonText>
                        </Button>
                    </ButtonContainer>
                : null}               
            </Container>
        </SafeAreaView>
    )
}

export default Homepage;