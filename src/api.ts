import { Game, Ship, TableColumns, TableRows } from "./hooks/gameContext";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()
    //console.log(data);
    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })
    const data = await result.json()
    //console.log(data);
    return data.id
};

export const getUserInfo = async (token: string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await result.json();
    //console.log(data);
    return data
}

export const listGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await result.json();

    return data
}

export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data
}

export const joinGame = async (token: string, gameId: string) => {
    const result = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    //console.log(data);
    return data
}


export const sendMove = async (token: string, gameId: string, cellRow: TableRows, cellColumn: TableColumns) => {
    //console.log(cellRow, cellColumn)
    const result = await fetch(`${baseUrl}/game/strike/${gameId}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            x: cellColumn,
            y: cellRow
        })
    })

    const data = await result.json();
    return data
}

export const getGameInfo = async (token: string, gameId: string): Promise<Game> => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await result.json();
    return data
}

export const sendGameConfiguration = async (token: string, gameId: string, ships: Ship[]) => {
    const body = {
        ships: ships
    };

    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'PATCH',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await result.json();
    //console.log(data);
    return data;
}