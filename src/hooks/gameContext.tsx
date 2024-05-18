import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./authContext";
import { getGameInfo, joinGame, sendGameConfiguration } from "../api";
import { Alert, Modal, Pressable, View } from "react-native";

export type TableColumns = 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type TableRows = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type CellValue = true | false;
export type playerToMove = number | null;
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


interface PlayerStrike {
    x: string;
    y: number;
}

interface GameMove {
    x: string;
    y: number;
    result: boolean;
    playerId: number;
}

enum GameStatus {
    CREATED = "CREATED",
    MAP_CONFIG = "MAP_CONFIG",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

interface Game {
    status: GameStatus;
    moves: GameMove[];
    playerToMove: playerToMove;
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
    tableState: ICell[][];
    placeShip: (cellRow: TableRows, cellColumn: TableColumns, shipSize: ShipSize , shipDirection: ShipDirection) => void; 
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    sendGameConfiguration: () => Promise.resolve(),
    game: null,
    tableState: [],
    placeShip: () => {}
});

const baseTableState: ICell[][] = [
    [{row: 'A', column: 1, value: false}, {row: 'A', column: 2, value: false}, {row: 'A', column: 3, value: false}, {row: 'A', column: 4, value: false}, {row: 'A', column: 5, value: false}, {row: 'A', column: 6, value: false}, {row: 'A', column: 7, value: false}, {row: 'A', column: 8, value: false}, {row: 'A', column: 9, value: false}, {row: 'A', column: 10, value: false}],
    [{row: 'B', column: 1, value: false}, {row: 'B', column: 2, value: false}, {row: 'B', column: 3, value: false}, {row: 'B', column: 4, value: false}, {row: 'B', column: 5, value: false}, {row: 'B', column: 6, value: false}, {row: 'B', column: 7, value: false}, {row: 'B', column: 8, value: false}, {row: 'B', column: 9, value: false}, {row: 'B', column: 10, value: false}],
    [{row: 'C', column: 1, value: false}, {row: 'C', column: 2, value: false}, {row: 'C', column: 3, value: false}, {row: 'C', column: 4, value: false}, {row: 'C', column: 5, value: false}, {row: 'C', column: 6, value: false}, {row: 'C', column: 7, value: false}, {row: 'C', column: 8, value: false}, {row: 'C', column: 9, value: false}, {row: 'C', column: 10, value: false}],
    [{row: 'D', column: 1, value: false}, {row: 'D', column: 2, value: false}, {row: 'D', column: 3, value: false}, {row: 'D', column: 4, value: false}, {row: 'D', column: 5, value: false}, {row: 'D', column: 6, value: false}, {row: 'D', column: 7, value: false}, {row: 'D', column: 8, value: false}, {row: 'D', column: 9, value: false}, {row: 'D', column: 10, value: false}],
    [{row: 'E', column: 1, value: false}, {row: 'E', column: 2, value: false}, {row: 'E', column: 3, value: false}, {row: 'E', column: 4, value: false}, {row: 'E', column: 5, value: false}, {row: 'E', column: 6, value: false}, {row: 'E', column: 7, value: false}, {row: 'E', column: 8, value: false}, {row: 'E', column: 9, value: false}, {row: 'E', column: 10, value: false}],
    [{row: 'F', column: 1, value: false}, {row: 'F', column: 2, value: false}, {row: 'F', column: 3, value: false}, {row: 'F', column: 4, value: false}, {row: 'F', column: 5, value: false}, {row: 'F', column: 6, value: false}, {row: 'F', column: 7, value: false}, {row: 'F', column: 8, value: false}, {row: 'F', column: 9, value: false}, {row: 'F', column: 10, value: false}],
    [{row: 'G', column: 1, value: false}, {row: 'G', column: 2, value: false}, {row: 'G', column: 3, value: false}, {row: 'G', column: 4, value: false}, {row: 'G', column: 5, value: false}, {row: 'G', column: 6, value: false}, {row: 'G', column: 7, value: false}, {row: 'G', column: 8, value: false}, {row: 'G', column: 9, value: false}, {row: 'G', column: 10, value: false}],
    [{row: 'H', column: 1, value: false}, {row: 'H', column: 2, value: false}, {row: 'H', column: 3, value: false}, {row: 'H', column: 4, value: false}, {row: 'H', column: 5, value: false}, {row: 'H', column: 6, value: false}, {row: 'H', column: 7, value: false}, {row: 'H', column: 8, value: false}, {row: 'H', column: 9, value: false}, {row: 'H', column: 10, value: false}],
    [{row: 'I', column: 1, value: false}, {row: 'I', column: 2, value: false}, {row: 'I', column: 3, value: false}, {row: 'I', column: 4, value: false}, {row: 'I', column: 5, value: false}, {row: 'I', column: 6, value: false}, {row: 'I', column: 7, value: false}, {row: 'I', column: 8, value: false}, {row: 'I', column: 9, value: false}, {row: 'I', column: 10, value: false}],
    [{row: 'J', column: 1, value: false}, {row: 'J', column: 2, value: false}, {row: 'J', column: 3, value: false}, {row: 'J', column: 4, value: false}, {row: 'J', column: 5, value: false}, {row: 'J', column: 6, value: false}, {row: 'J', column: 7, value: false}, {row: 'J', column: 8, value: false}, {row: 'J', column: 9, value: false}, {row: 'J', column: 10, value: false}],
]


export const GameContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [tableState, setTableState] = useState<ICell[][]>(baseTableState); // Am modificat eu aici
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

    const modifyCells = (cells: {row: TableRows, column: TableColumns}[]) => {
        const newTableState = JSON.parse(JSON.stringify(tableState));
        newTableState.forEach((line: ICell[]) => {
            line.forEach(cell => {
                if(cells.some(obj => obj.row === cell.row && obj.column === cell.column)){
                    if(cell.value === false)
                        cell.value = true;
                    else throw new Error('Collision');
                }
            })
        })
        setTableState(newTableState);
    }


    
    const placeShip = (cellRow: TableRows, cellColumn: TableColumns, shipSize: ShipSize , shipDirection: ShipDirection) => {
        if(shipDirection === ShipDirection.VERTICAL){
            const lowerMargin = (cellRow.charCodeAt(0) - 'A'.charCodeAt(0) + 1) + shipSize - 1;
            const currentRow = cellRow.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            if(lowerMargin <= 10){
                const generatedObjects = Array.from({ length: lowerMargin - currentRow + 1 }, (_, i) => {
                    const row = String.fromCharCode(65 + lowerMargin - i - 1) as TableRows;
                    return { row, column: cellColumn };
                });
                try {
                    modifyCells(generatedObjects);
                } catch(e) {
                    throw new Error("Nu se poate plasa aici2")
                }
            } else throw new Error("Nu se poate plasa aici")
        } else { 
            const rightMargin = cellColumn + shipSize - 1;
            if(rightMargin <= 10){
                const generatedObjects = Array.from({ length: rightMargin - cellColumn + 1 }, (_, i) => {
                    const column = cellColumn + i as TableColumns;
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

    return (<Context.Provider value={{loadGame: handleLoadGame, game, tableState, placeShip: placeShip, sendGameConfiguration: handleSendGameConfiguration}}>
        {children}
    </Context.Provider>)
}

export const useGameContext = () => useContext(Context);