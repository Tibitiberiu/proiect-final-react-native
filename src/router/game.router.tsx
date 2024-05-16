import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameRouteNames } from "./route-names";
import TableScreen from "../screens/game/Table.screen";

const GameStack = createNativeStackNavigator()

const gameRoutes = (
    <GameStack.Navigator initialRouteName='Table'>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TableScreen} options={{
            headerShown: false
        }}/>
    </GameStack.Navigator>
)

export default gameRoutes;