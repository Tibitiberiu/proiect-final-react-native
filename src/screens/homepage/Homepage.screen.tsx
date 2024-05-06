import Homepage from "../../components/Homepage"
import { useAuth } from "../../hooks/authContext"


const HomepageScreen = () => {
    const auth = useAuth()
    return <Homepage onSubmit={auth.register} />
}

export default HomepageScreen