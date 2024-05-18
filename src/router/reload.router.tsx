import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameRouteNames } from "./route-names";
import TableReloadScreen from "../screens/game/TableReload.screen";

const reloadStack = createNativeStackNavigator()

const reloadRoutes = (
    <reloadStack.Navigator initialRouteName='TableReload'>
        <reloadStack.Screen name={GameRouteNames.TABLERELOAD} component={TableReloadScreen} options={{
            headerShown: false
        }}/>
    </reloadStack.Navigator>
)

export default reloadRoutes;