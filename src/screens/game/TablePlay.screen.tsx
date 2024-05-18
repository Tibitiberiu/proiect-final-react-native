import { useEffect } from "react";
import { useAuth } from "../../hooks/authContext";
import { GameContextProvider, useGameContext } from "../../hooks/gameContext";
import TablePlay from "../../components/TablePlay";

const TablePlayScreen = () => {
    const gameCtx = useGameContext();
    const auth = useAuth();
    useEffect(() => {
        gameCtx.loadGame(auth.isInGame)
    }, [])

    return (
        <TablePlay/>
    )
}

export default () => (
    <GameContextProvider>
        <TablePlayScreen/>
    </GameContextProvider>
);