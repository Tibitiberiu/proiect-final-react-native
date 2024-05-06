import React, {useState} from "react";
import { SafeAreaView, Text } from "react-native";
import { useAuth } from "../hooks/authContext";
import { useNavigation } from "@react-navigation/native";
import { AlertContainerError, AlertContainerSuccess, AlertTextError, AlertTextSuccess, Button, ButtonContainer, ButtonText, Container, Input, Title } from "./Components";


const Register : React.FC = () => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
    const handleSubmit = () => auth.register(email, password, navigation)
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Register page</Title>
                {auth.error.type === "register" ? (auth.error.success === false ? <AlertContainerError>
                                    <AlertTextError width="100%" textAlign="center"> Error! {auth.error.message} </AlertTextError>
                               </AlertContainerError> : <AlertContainerSuccess>
                                    <AlertTextSuccess width="100%" textAlign="center"> {auth.error.message} </AlertTextSuccess>
                               </AlertContainerSuccess>) : null}
                <Text>Email: </Text>
                <Input keyboardType="email-address" placeholder="email@domain.com" onChangeText={setEmail}/>
                <Text>Password: </Text>
                <Input secureTextEntry placeholder="************" onChangeText={setPassword} />
                <ButtonContainer>
                    <Button onPress={handleSubmit}>
                        <ButtonText>Submit</ButtonText>
                    </Button>
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
}

export default Register;