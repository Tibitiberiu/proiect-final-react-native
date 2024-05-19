import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login.screen';
import RegisterScreen from '../screens/auth/Register.screen';
import { AuthRouteNames } from './route-names';

const AuthStack = createNativeStackNavigator()

const authRoutes = (
    <AuthStack.Navigator initialRouteName='Login'>
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerShown: false
        }}/>
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen} options={{
           headerTitle: ' '
        }}/>
    </AuthStack.Navigator>
)

export default authRoutes;