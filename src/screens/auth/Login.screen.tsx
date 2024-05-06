import { useNavigation } from "@react-navigation/native"
import Login from "../../components/Login"
import { AuthRouteNames } from "../../router/route-names"

const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const handleGoToRegister = () => {
        navigation.navigate(AuthRouteNames.REGISTER)
    }
    return <Login goToRegister={handleGoToRegister}/> 
}

export default LoginScreen