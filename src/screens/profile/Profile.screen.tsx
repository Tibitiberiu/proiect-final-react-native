import Profile from "../../components/Profile"
import { useAuth } from "../../hooks/authContext"


const ProfileScreen = () => {
    const auth = useAuth()
    return <Profile onSubmit={auth.register} />
}

export default ProfileScreen