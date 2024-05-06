import React, {useState} from "react";
import { SafeAreaView, Text } from "react-native";
import { useAuth } from "../hooks/authContext";
import { AlertContainerError, AlertContainerSuccess, AlertTextError, AlertTextSuccess, Button, ButtonContainer, ButtonText, Container, Input, TextTitle, Title } from "./Components";

export interface ILogin {
    goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({goToRegister}) => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = () => auth.login(email, password)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                <Title>Login page</Title>
                {auth.error.type === "login" ? (auth.error.success === false ? <AlertContainerError>
                                    <AlertTextError width="100%" textAlign="center"> <TextTitle>Error!</TextTitle> {auth.error.message} </AlertTextError>
                            </AlertContainerError> : <AlertContainerSuccess>
                                    <AlertTextSuccess width="100%" textAlign="center"><TextTitle>Success!</TextTitle> {auth.error.message} </AlertTextSuccess>
                    </AlertContainerSuccess>) : null}
                <Text>Email: </Text>
                <Input keyboardType="email-address" placeholder="email@domain.com" onChangeText={setEmail}/>
                <Text>Password: </Text>
                <Input secureTextEntry placeholder="************" onChangeText={setPassword} />
                <ButtonContainer>
                    <Button onPress={handleSubmit}>
                        <ButtonText>Submit</ButtonText>
                    </Button>
                    <Text>Don't have an accont?</Text>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={goToRegister}>
                        Register Now
                    </Text>
                    {/* <Button onPress={goToRegister}>
                        <ButtonText>Register</ButtonText>
                    </Button> */}
                </ButtonContainer>
            </Container>
        </SafeAreaView>
    )
}

export default Login;