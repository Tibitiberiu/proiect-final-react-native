import HomepageScreen from '../screens/homepage/Homepage.screen';
import ProfileScreen from '../screens/profile/Profile.screen';
import {  HomepageRouteNames } from './route-names';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomepageTab = createBottomTabNavigator();

const homepageRoutes = (
    <HomepageTab.Navigator initialRouteName='Homepage'>
        <HomepageTab.Screen name={HomepageRouteNames.HOMEPAGE} component={HomepageScreen} options={{
            headerShown: false
        }}/>
        <HomepageTab.Screen name={HomepageRouteNames.PROFILE} component={ProfileScreen} options={{
            headerShown: false
        }}/>
    </HomepageTab.Navigator>
)

export default homepageRoutes;