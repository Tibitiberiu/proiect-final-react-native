import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./authContext";
import { getGameInfo, sendGameConfiguration, sendMove } from "../api";

export type TableRows = 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type TableColumns = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type CellValue = true | false;
export type ShipSize = 2 | 3 | 4 | 6;

export enum ShipDirection {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}

export interface ICell {
    row: TableRows;
    column: TableColumns;
    value: CellValue;
}

export interface StrikeCell {
    row: TableRows;
    column: TableColumns;
    value: -1 | 0 | 1;
}

interface PlayerStrike {
    x: string;
    y: number;
}

interface GameMove {
    x: string;
    y: number;
    result: boolean;
    playerId: string;
}

export enum GameStatus {
    CREATED = "CREATED",
    MAP_CONFIG = "MAP_CONFIG",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

export interface Game {
    id: string;
    status: GameStatus;
    moves: GameMove[];
    playerToMoveId: string;
    player1Id: string;
    player2Id: string;
}
interface GameList {
    total: number;
    games: Game[];
}

interface JoinGameResponse {
    id: string;
    status: GameStatus;
    player1Id: string;
    player2Id: string;
    playerToMoveId: string;
}

export interface Ship {
    x: string;
    y: number;
    size: ShipSize;
    direction: ShipDirection;
}

interface MapConfigBody{
    ships: Ship[];
}

interface GameContext {
    game: Game | null;
    loadGame: (id: string) => Promise<void>;
    sendGameConfiguration: (ships: Ship[]) => Promise<void>;
    sendMove: (row: TableRows, column: TableColumns) => Promise<void>;
    sendReloadMove: (NMoves: number) => Promise<void>;
    tableState: ICell[][];
    strikeTableState: StrikeCell[][];
    reloadTableState1: StrikeCell[][];
    reloadTableState2: StrikeCell[][];
    placeShip: (cellColumn: TableColumns, cellRow: TableRows, shipSize: ShipSize , shipDirection: ShipDirection) => void; 
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    sendGameConfiguration: () => Promise.resolve(),
    sendMove: () => Promise.resolve(),
    sendReloadMove: () => Promise.resolve(),
    game: null,
    tableState: [],
    reloadTableState1: [],
    reloadTableState2: [],
    strikeTableState: [],
    placeShip: () => {}
});

const baseTableState: ICell[][] = [
    [{row: 1, column: 'A', value: false}, {row: 1, column: 'B', value: false}, {row: 1, column: 'C', value: false}, {row: 1, column: 'D', value: false}, {row: 1, column: 'E', value: false}, {row: 1, column: 'F', value: false}, {row: 1, column: 'G', value: false}, {row: 1, column: 'H', value: false}, {row: 1, column: 'I', value: false}, {row: 1, column: 'J', value: false}],
    [{row: 2, column: 'A', value: false}, {row: 2, column: 'B', value: false}, {row: 2, column: 'C', value: false}, {row: 2, column: 'D', value: false}, {row: 2, column: 'E', value: false}, {row: 2, column: 'F', value: false}, {row: 2, column: 'G', value: false}, {row: 2, column: 'H', value: false}, {row: 2, column: 'I', value: false}, {row: 2, column: 'J', value: false}],
    [{row: 3, column: 'A', value: false}, {row: 3, column: 'B', value: false}, {row: 3, column: 'C', value: false}, {row: 3, column: 'D', value: false}, {row: 3, column: 'E', value: false}, {row: 3, column: 'F', value: false}, {row: 3, column: 'G', value: false}, {row: 3, column: 'H', value: false}, {row: 3, column: 'I', value: false}, {row: 3, column: 'J', value: false}],
    [{row: 4, column: 'A', value: false}, {row: 4, column: 'B', value: false}, {row: 4, column: 'C', value: false}, {row: 4, column: 'D', value: false}, {row: 4, column: 'E', value: false}, {row: 4, column: 'F', value: false}, {row: 4, column: 'G', value: false}, {row: 4, column: 'H', value: false}, {row: 4, column: 'I', value: false}, {row: 4, column: 'J', value: false}],
    [{row: 5, column: 'A', value: false}, {row: 5, column: 'B', value: false}, {row: 5, column: 'C', value: false}, {row: 5, column: 'D', value: false}, {row: 5, column: 'E', value: false}, {row: 5, column: 'F', value: false}, {row: 5, column: 'G', value: false}, {row: 5, column: 'H', value: false}, {row: 5, column: 'I', value: false}, {row: 5, column: 'J', value: false}],
    [{row: 6, column: 'A', value: false}, {row: 6, column: 'B', value: false}, {row: 6, column: 'C', value: false}, {row: 6, column: 'D', value: false}, {row: 6, column: 'E', value: false}, {row: 6, column: 'F', value: false}, {row: 6, column: 'G', value: false}, {row: 6, column: 'H', value: false}, {row: 6, column: 'I', value: false}, {row: 6, column: 'J', value: false}],
    [{row: 7, column: 'A', value: false}, {row: 7, column: 'B', value: false}, {row: 7, column: 'C', value: false}, {row: 7, column: 'D', value: false}, {row: 7, column: 'E', value: false}, {row: 7, column: 'F', value: false}, {row: 7, column: 'G', value: false}, {row: 7, column: 'H', value: false}, {row: 7, column: 'I', value: false}, {row: 7, column: 'J', value: false}],
    [{row: 8, column: 'A', value: false}, {row: 8, column: 'B', value: false}, {row: 8, column: 'C', value: false}, {row: 8, column: 'D', value: false}, {row: 8, column: 'E', value: false}, {row: 8, column: 'F', value: false}, {row: 8, column: 'G', value: false}, {row: 8, column: 'H', value: false}, {row: 8, column: 'I', value: false}, {row: 8, column: 'J', value: false}],
    [{row: 9, column: 'A', value: false}, {row: 9, column: 'B', value: false}, {row: 9, column: 'C', value: false}, {row: 9, column: 'D', value: false}, {row: 9, column: 'E', value: false}, {row: 9, column: 'F', value: false}, {row: 9, column: 'G', value: false}, {row: 9, column: 'H', value: false}, {row: 9, column: 'I', value: false}, {row: 9, column: 'J', value: false}],
    [{row: 10, column: 'A', value: false}, {row: 10, column: 'B', value: false}, {row: 10, column: 'C', value: false}, {row: 10, column: 'D', value: false}, {row: 10, column: 'E', value: false}, {row: 10, column: 'F', value: false}, {row: 10, column: 'G', value: false}, {row: 10, column: 'H', value: false}, {row: 10, column: 'I', value: false}, {row: 10, column: 'J', value: false}],
]


const baseStrikeTableState: StrikeCell[][] = [
    [{row: 1, column: 'A', value: 0}, {row: 1, column: 'B', value: 0}, {row: 1, column: 'C', value: 0}, {row: 1, column: 'D', value: 0}, {row: 1, column: 'E', value: 0}, {row: 1, column: 'F', value: 0}, {row: 1, column: 'G', value: 0}, {row: 1, column: 'H', value: 0}, {row: 1, column: 'I', value: 0}, {row: 1, column: 'J', value: 0}],
    [{row: 2, column: 'A', value: 0}, {row: 2, column: 'B', value: 0}, {row: 2, column: 'C', value: 0}, {row: 2, column: 'D', value: 0}, {row: 2, column: 'E', value: 0}, {row: 2, column: 'F', value: 0}, {row: 2, column: 'G', value: 0}, {row: 2, column: 'H', value: 0}, {row: 2, column: 'I', value: 0}, {row: 2, column: 'J', value: 0}],
    [{row: 3, column: 'A', value: 0}, {row: 3, column: 'B', value: 0}, {row: 3, column: 'C', value: 0}, {row: 3, column: 'D', value: 0}, {row: 3, column: 'E', value: 0}, {row: 3, column: 'F', value: 0}, {row: 3, column: 'G', value: 0}, {row: 3, column: 'H', value: 0}, {row: 3, column: 'I', value: 0}, {row: 3, column: 'J', value: 0}],
    [{row: 4, column: 'A', value: 0}, {row: 4, column: 'B', value: 0}, {row: 4, column: 'C', value: 0}, {row: 4, column: 'D', value: 0}, {row: 4, column: 'E', value: 0}, {row: 4, column: 'F', value: 0}, {row: 4, column: 'G', value: 0}, {row: 4, column: 'H', value: 0}, {row: 4, column: 'I', value: 0}, {row: 4, column: 'J', value: 0}],
    [{row: 5, column: 'A', value: 0}, {row: 5, column: 'B', value: 0}, {row: 5, column: 'C', value: 0}, {row: 5, column: 'D', value: 0}, {row: 5, column: 'E', value: 0}, {row: 5, column: 'F', value: 0}, {row: 5, column: 'G', value: 0}, {row: 5, column: 'H', value: 0}, {row: 5, column: 'I', value: 0}, {row: 5, column: 'J', value: 0}],
    [{row: 6, column: 'A', value: 0}, {row: 6, column: 'B', value: 0}, {row: 6, column: 'C', value: 0}, {row: 6, column: 'D', value: 0}, {row: 6, column: 'E', value: 0}, {row: 6, column: 'F', value: 0}, {row: 6, column: 'G', value: 0}, {row: 6, column: 'H', value: 0}, {row: 6, column: 'I', value: 0}, {row: 6, column: 'J', value: 0}],
    [{row: 7, column: 'A', value: 0}, {row: 7, column: 'B', value: 0}, {row: 7, column: 'C', value: 0}, {row: 7, column: 'D', value: 0}, {row: 7, column: 'E', value: 0}, {row: 7, column: 'F', value: 0}, {row: 7, column: 'G', value: 0}, {row: 7, column: 'H', value: 0}, {row: 7, column: 'I', value: 0}, {row: 7, column: 'J', value: 0}],
    [{row: 8, column: 'A', value: 0}, {row: 8, column: 'B', value: 0}, {row: 8, column: 'C', value: 0}, {row: 8, column: 'D', value: 0}, {row: 8, column: 'E', value: 0}, {row: 8, column: 'F', value: 0}, {row: 8, column: 'G', value: 0}, {row: 8, column: 'H', value: 0}, {row: 8, column: 'I', value: 0}, {row: 8, column: 'J', value: 0}],
    [{row: 9, column: 'A', value: 0}, {row: 9, column: 'B', value: 0}, {row: 9, column: 'C', value: 0}, {row: 9, column: 'D', value: 0}, {row: 9, column: 'E', value: 0}, {row: 9, column: 'F', value: 0}, {row: 9, column: 'G', value: 0}, {row: 9, column: 'H', value: 0}, {row: 9, column: 'I', value: 0}, {row: 9, column: 'J', value: 0}],
    [{row: 10, column: 'A', value: 0}, {row: 10, column: 'B', value: 0}, {row: 10, column: 'C', value: 0}, {row: 10, column: 'D', value: 0}, {row: 10, column: 'E', value: 0}, {row: 10, column: 'F', value: 0}, {row: 10, column: 'G', value: 0}, {row: 10, column: 'H', value: 0}, {row: 10, column: 'I', value: 0}, {row: 10, column: 'J', value: 0}],
]

const baseReloadTableState1: StrikeCell[][] = [
    [{row: 1, column: 'A', value: 0}, {row: 1, column: 'B', value: 0}, {row: 1, column: 'C', value: 0}, {row: 1, column: 'D', value: 0}, {row: 1, column: 'E', value: 0}, {row: 1, column: 'F', value: 0}, {row: 1, column: 'G', value: 0}, {row: 1, column: 'H', value: 0}, {row: 1, column: 'I', value: 0}, {row: 1, column: 'J', value: 0}],
    [{row: 2, column: 'A', value: 0}, {row: 2, column: 'B', value: 0}, {row: 2, column: 'C', value: 0}, {row: 2, column: 'D', value: 0}, {row: 2, column: 'E', value: 0}, {row: 2, column: 'F', value: 0}, {row: 2, column: 'G', value: 0}, {row: 2, column: 'H', value: 0}, {row: 2, column: 'I', value: 0}, {row: 2, column: 'J', value: 0}],
    [{row: 3, column: 'A', value: 0}, {row: 3, column: 'B', value: 0}, {row: 3, column: 'C', value: 0}, {row: 3, column: 'D', value: 0}, {row: 3, column: 'E', value: 0}, {row: 3, column: 'F', value: 0}, {row: 3, column: 'G', value: 0}, {row: 3, column: 'H', value: 0}, {row: 3, column: 'I', value: 0}, {row: 3, column: 'J', value: 0}],
    [{row: 4, column: 'A', value: 0}, {row: 4, column: 'B', value: 0}, {row: 4, column: 'C', value: 0}, {row: 4, column: 'D', value: 0}, {row: 4, column: 'E', value: 0}, {row: 4, column: 'F', value: 0}, {row: 4, column: 'G', value: 0}, {row: 4, column: 'H', value: 0}, {row: 4, column: 'I', value: 0}, {row: 4, column: 'J', value: 0}],
    [{row: 5, column: 'A', value: 0}, {row: 5, column: 'B', value: 0}, {row: 5, column: 'C', value: 0}, {row: 5, column: 'D', value: 0}, {row: 5, column: 'E', value: 0}, {row: 5, column: 'F', value: 0}, {row: 5, column: 'G', value: 0}, {row: 5, column: 'H', value: 0}, {row: 5, column: 'I', value: 0}, {row: 5, column: 'J', value: 0}],
    [{row: 6, column: 'A', value: 0}, {row: 6, column: 'B', value: 0}, {row: 6, column: 'C', value: 0}, {row: 6, column: 'D', value: 0}, {row: 6, column: 'E', value: 0}, {row: 6, column: 'F', value: 0}, {row: 6, column: 'G', value: 0}, {row: 6, column: 'H', value: 0}, {row: 6, column: 'I', value: 0}, {row: 6, column: 'J', value: 0}],
    [{row: 7, column: 'A', value: 0}, {row: 7, column: 'B', value: 0}, {row: 7, column: 'C', value: 0}, {row: 7, column: 'D', value: 0}, {row: 7, column: 'E', value: 0}, {row: 7, column: 'F', value: 0}, {row: 7, column: 'G', value: 0}, {row: 7, column: 'H', value: 0}, {row: 7, column: 'I', value: 0}, {row: 7, column: 'J', value: 0}],
    [{row: 8, column: 'A', value: 0}, {row: 8, column: 'B', value: 0}, {row: 8, column: 'C', value: 0}, {row: 8, column: 'D', value: 0}, {row: 8, column: 'E', value: 0}, {row: 8, column: 'F', value: 0}, {row: 8, column: 'G', value: 0}, {row: 8, column: 'H', value: 0}, {row: 8, column: 'I', value: 0}, {row: 8, column: 'J', value: 0}],
    [{row: 9, column: 'A', value: 0}, {row: 9, column: 'B', value: 0}, {row: 9, column: 'C', value: 0}, {row: 9, column: 'D', value: 0}, {row: 9, column: 'E', value: 0}, {row: 9, column: 'F', value: 0}, {row: 9, column: 'G', value: 0}, {row: 9, column: 'H', value: 0}, {row: 9, column: 'I', value: 0}, {row: 9, column: 'J', value: 0}],
    [{row: 10, column: 'A', value: 0}, {row: 10, column: 'B', value: 0}, {row: 10, column: 'C', value: 0}, {row: 10, column: 'D', value: 0}, {row: 10, column: 'E', value: 0}, {row: 10, column: 'F', value: 0}, {row: 10, column: 'G', value: 0}, {row: 10, column: 'H', value: 0}, {row: 10, column: 'I', value: 0}, {row: 10, column: 'J', value: 0}],
]

const baseReloadTableState2: StrikeCell[][] = [
    [{row: 1, column: 'A', value: 0}, {row: 1, column: 'B', value: 0}, {row: 1, column: 'C', value: 0}, {row: 1, column: 'D', value: 0}, {row: 1, column: 'E', value: 0}, {row: 1, column: 'F', value: 0}, {row: 1, column: 'G', value: 0}, {row: 1, column: 'H', value: 0}, {row: 1, column: 'I', value: 0}, {row: 1, column: 'J', value: 0}],
    [{row: 2, column: 'A', value: 0}, {row: 2, column: 'B', value: 0}, {row: 2, column: 'C', value: 0}, {row: 2, column: 'D', value: 0}, {row: 2, column: 'E', value: 0}, {row: 2, column: 'F', value: 0}, {row: 2, column: 'G', value: 0}, {row: 2, column: 'H', value: 0}, {row: 2, column: 'I', value: 0}, {row: 2, column: 'J', value: 0}],
    [{row: 3, column: 'A', value: 0}, {row: 3, column: 'B', value: 0}, {row: 3, column: 'C', value: 0}, {row: 3, column: 'D', value: 0}, {row: 3, column: 'E', value: 0}, {row: 3, column: 'F', value: 0}, {row: 3, column: 'G', value: 0}, {row: 3, column: 'H', value: 0}, {row: 3, column: 'I', value: 0}, {row: 3, column: 'J', value: 0}],
    [{row: 4, column: 'A', value: 0}, {row: 4, column: 'B', value: 0}, {row: 4, column: 'C', value: 0}, {row: 4, column: 'D', value: 0}, {row: 4, column: 'E', value: 0}, {row: 4, column: 'F', value: 0}, {row: 4, column: 'G', value: 0}, {row: 4, column: 'H', value: 0}, {row: 4, column: 'I', value: 0}, {row: 4, column: 'J', value: 0}],
    [{row: 5, column: 'A', value: 0}, {row: 5, column: 'B', value: 0}, {row: 5, column: 'C', value: 0}, {row: 5, column: 'D', value: 0}, {row: 5, column: 'E', value: 0}, {row: 5, column: 'F', value: 0}, {row: 5, column: 'G', value: 0}, {row: 5, column: 'H', value: 0}, {row: 5, column: 'I', value: 0}, {row: 5, column: 'J', value: 0}],
    [{row: 6, column: 'A', value: 0}, {row: 6, column: 'B', value: 0}, {row: 6, column: 'C', value: 0}, {row: 6, column: 'D', value: 0}, {row: 6, column: 'E', value: 0}, {row: 6, column: 'F', value: 0}, {row: 6, column: 'G', value: 0}, {row: 6, column: 'H', value: 0}, {row: 6, column: 'I', value: 0}, {row: 6, column: 'J', value: 0}],
    [{row: 7, column: 'A', value: 0}, {row: 7, column: 'B', value: 0}, {row: 7, column: 'C', value: 0}, {row: 7, column: 'D', value: 0}, {row: 7, column: 'E', value: 0}, {row: 7, column: 'F', value: 0}, {row: 7, column: 'G', value: 0}, {row: 7, column: 'H', value: 0}, {row: 7, column: 'I', value: 0}, {row: 7, column: 'J', value: 0}],
    [{row: 8, column: 'A', value: 0}, {row: 8, column: 'B', value: 0}, {row: 8, column: 'C', value: 0}, {row: 8, column: 'D', value: 0}, {row: 8, column: 'E', value: 0}, {row: 8, column: 'F', value: 0}, {row: 8, column: 'G', value: 0}, {row: 8, column: 'H', value: 0}, {row: 8, column: 'I', value: 0}, {row: 8, column: 'J', value: 0}],
    [{row: 9, column: 'A', value: 0}, {row: 9, column: 'B', value: 0}, {row: 9, column: 'C', value: 0}, {row: 9, column: 'D', value: 0}, {row: 9, column: 'E', value: 0}, {row: 9, column: 'F', value: 0}, {row: 9, column: 'G', value: 0}, {row: 9, column: 'H', value: 0}, {row: 9, column: 'I', value: 0}, {row: 9, column: 'J', value: 0}],
    [{row: 10, column: 'A', value: 0}, {row: 10, column: 'B', value: 0}, {row: 10, column: 'C', value: 0}, {row: 10, column: 'D', value: 0}, {row: 10, column: 'E', value: 0}, {row: 10, column: 'F', value: 0}, {row: 10, column: 'G', value: 0}, {row: 10, column: 'H', value: 0}, {row: 10, column: 'I', value: 0}, {row: 10, column: 'J', value: 0}],
]


export const GameContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [tableState, setTableState] = useState<ICell[][]>(baseTableState); // Am modificat eu aici
    const [strikeTableState, setStrikeTableState] = useState<StrikeCell[][]>(baseStrikeTableState); // Am modificat eu aici
    const [reloadTableState1, setReloadTableState1] = useState<StrikeCell[][]>(baseReloadTableState1); // Am modificat eu aici
    const [reloadTableState2, setReloadTableState2] = useState<StrikeCell[][]>(baseReloadTableState2); // Am modificat eu aici
    const auth = useAuth();
    const [game, setGame] = useState<Game | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const loopRef = useRef<NodeJS.Timeout>();

    const handleLoadGame = async (id: string) => {
        const result = await getGameInfo(auth.token, auth.isInGame);
        setGame(result);
    }

    const handleSendGameConfiguration = async(ships: Ship[]) => {
        const result = await sendGameConfiguration(auth.token, auth.isInGame, ships);
    }

    const handleSendReloadMove = async(firstNMoves: number) => {
        const result = await getGameInfo(auth.token, auth.isInGame);
        const firstPlayer = result.player1Id;
        const secondPlayer = result.player2Id;
        const moves = result.moves.slice(0, firstNMoves);
        const newReloadTableState1 = JSON.parse(JSON.stringify(reloadTableState1));
        const newReloadTableState2 = JSON.parse(JSON.stringify(reloadTableState2));
        //console.log(result);
        moves.forEach((move: GameMove) => {
            if(move.playerId === firstPlayer){
                newReloadTableState1.forEach((line: StrikeCell[]) => {
                    line.forEach(cell => {
                        if(move.y === cell.row && move.x === cell.column){
                            if(cell.value == 0){
                                if(move.result === true){
                                    cell.value = 1;
                                } else {
                                    cell.value = -1;
                                }
                            }
                        }
                    })
                })
            } else {
                newReloadTableState2.forEach((line: StrikeCell[]) => {
                    line.forEach(cell => {
                        if(move.y === cell.row && move.x === cell.column){
                            if(cell.value == 0){
                                if(move.result === true){
                                    cell.value = 1;
                                } else {
                                    cell.value = -1;
                                }
                            }
                        }
                    })
                })
            }
        })
        //console.log(newStrikeTableState);
        setReloadTableState1(newReloadTableState1);
        setReloadTableState2(newReloadTableState2);
    }

    const handleSendMove = async(row: TableRows, column: TableColumns) => {
        const result = await sendMove(auth.token, auth.isInGame, row, column);
        const newStrikeTableState = JSON.parse(JSON.stringify(strikeTableState));
        //console.log(result);
        if(result.result === true || result.result === false){
            newStrikeTableState.forEach((line: StrikeCell[]) => {
                line.forEach(cell => {
                    if(row === cell.row && column === cell.column){
                        if(cell.value == 0){
                            if(result.result === true){
                                cell.value = 1;
                            } else {
                                cell.value = -1;
                            }
                        }
                    }
                })
            })
        }
        //console.log(newStrikeTableState);
        setStrikeTableState(newStrikeTableState);
    }

    const modifyCells = (cells: {row: TableRows, column: TableColumns}[]) => {
        const newTableState = JSON.parse(JSON.stringify(tableState));
        newTableState.forEach((line: ICell[]) => {
            line.forEach(cell => {
                if(cells.some(obj => obj.row === cell.row && obj.column === cell.column)){
                    if(cell.value === false)
                        cell.value = true; // Poti sa intersectezi vertical cu orizontal si nu e bine
                    else throw new Error('Collision');
                }
            })
        })
        setTableState(newTableState);
    }

    
    const placeShip = (cellColumn: TableColumns, cellRow: TableRows, shipSize: ShipSize , shipDirection: ShipDirection) => {
        if(shipDirection === ShipDirection.VERTICAL){
            const lowerMargin = cellRow + shipSize - 1
            if(lowerMargin <= 10){
                const generatedObjects = Array.from({ length: shipSize }, (_, i) => {
                    const row = lowerMargin - i as TableRows;
                    return { row, column: cellColumn };
                });
                try {
                    modifyCells(generatedObjects);
                } catch(e) {
                    throw new Error("Nu se poate plasa aici2")
                }
            } else throw new Error("Nu se poate plasa aici")
        } else { 
            const rightMargin = (cellColumn.charCodeAt(0) - 'A'.charCodeAt(0) + 1) + shipSize - 1;
            const currentColumn = cellColumn.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            if(rightMargin <= 10){
                const generatedObjects = Array.from({ length: shipSize }, (_, i) => {
                    const column = String.fromCharCode(65 + currentColumn + shipSize - i - 2) as TableColumns;
                    return { row: cellRow , column };
                });
                try {
                    modifyCells(generatedObjects);
                } catch(e) {
                    throw new Error("Nu se poate plasa aici2")
                }
            } else throw new Error("Nu se poate plasa aici")
        }
    }
    useEffect(() => {
        loopRef.current = setInterval(() => {
            if (game) {
                handleLoadGame(auth.isInGame)
                //console.log("reload game");
            }
        }, 1000);
        return () => {
            clearInterval(loopRef.current)
        }
    }, [game])

    return (<Context.Provider value={{loadGame: handleLoadGame, game, tableState, strikeTableState, reloadTableState1, reloadTableState2, placeShip: placeShip, sendGameConfiguration: handleSendGameConfiguration, sendMove: handleSendMove, sendReloadMove: handleSendReloadMove}}>
        {children}
    </Context.Provider>)
}

export const useGameContext = () => useContext(Context);