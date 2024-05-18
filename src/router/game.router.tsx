import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameRouteNames } from "./route-names";
import TableScreen from "../screens/game/Table.screen";
import TablePlayScreen from "../screens/game/TablePlay.screen";

const GameStack = createNativeStackNavigator()

const gameRoutes = (
    <GameStack.Navigator initialRouteName='Table'>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TableScreen} options={{
            headerShown: false
        }}/>
         <GameStack.Screen name={GameRouteNames.TABLEPLAY} component={TablePlayScreen} options={{
            headerShown: false
        }}/>
    </GameStack.Navigator>
)

export default gameRoutes;