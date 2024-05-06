import HomepageScreen from '../screens/homepage/Homepage.screen';
import ProfileScreen from '../screens/profile/Profile.screen';
import {  HomepageRouteNames } from './route-names';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomepageTab = createBottomTabNavigator();

const homepageRoutes = (
    <HomepageTab.Navigator initialRouteName='Profile'>
        <HomepageTab.Screen name={HomepageRouteNames.HOMEPAGE} component={HomepageScreen} options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
            ),
            headerShown: false,
        }}/>
        <HomepageTab.Screen name={HomepageRouteNames.PROFILE} component={ProfileScreen} options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
            ),
            headerShown: false,
        }}/>
    </HomepageTab.Navigator>
)
export default homepageRoutes;