import { useEffect } from "react";
import { useAuth } from "../../hooks/authContext";
import { GameContextProvider, useGameContext } from "../../hooks/gameContext";
import TableReload from "../../components/TableReload";

const TableReloadScreen = () => {
    const gameCtx = useGameContext();
    const auth = useAuth();
    useEffect(() => {
        gameCtx.loadGame(auth.isInGame)
    }, [])

    return (
        <TableReload/>
    )
}

export default () => (
    <GameContextProvider>
        <TableReloadScreen/>
    </GameContextProvider>
);