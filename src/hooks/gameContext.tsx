

interface Move {
    x: string;
    y: number;
    result: boolean;
    playerId: number;
}

interface Game {
    status: string;
    moves: Move[];
    playerToMove: number;
}

interface GameList {
    total: number;
    games: Game[];
}