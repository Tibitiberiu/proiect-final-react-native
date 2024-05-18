import { useEffect } from "react";
import Table from "../../components/Table"
import { useAuth } from "../../hooks/authContext";
import { GameContextProvider, useGameContext } from "../../hooks/gameContext";
import { sendMove } from "../../api";

const TableScreen = () => {
    const gameCtx = useGameContext();
    const auth = useAuth();
    useEffect(() => {
        gameCtx.loadGame(auth.isInGame)
    }, [])

    return (
        <Table state={gameCtx.tableState} onClick={(cellRow, cellColumn) => sendMove(auth.token, auth.isInGame, cellRow, cellColumn)}/>
    )
}

export default () => (
    <GameContextProvider>
        <TableScreen/>
    </GameContextProvider>
);