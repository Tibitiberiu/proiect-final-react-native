import React, {useState} from "react";
import styled from "styled-components/native";
import { SafeAreaView, Text } from "react-native";
import { useAuth } from "../hooks/authContext";

const Container = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 10px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 20px;
`

const ButtonContainer = styled.View`
    align-items: center;
    gap: 10px;
    paddingTop: 30px;
`

const Input = styled.TextInput`
    height: 50px;
    padding-horizontal: 20px;
    border-color: red;
    border-width: 1px;
    border-radius: 7px;
    background-color: white;
`

const Button = styled.Pressable`
    background-color: #007260;
    height: 45px;
    width: 200px;
    border-color: gray;
    border-width: 1px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;
const Title = styled.Text`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    paddingBottom: 10px;
`
const AlertContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px 0 10px 0;
  background-color: #fed7d7;
`;

const AlertText = styled.Text`
  font-weight: bold;
  color: #2d3753;
  text-align: center;
`;

export interface ILogin {
    onSubmit: (email: string, password: string) => void
}

const Register: React.FC<ILogin> = ({onSubmit}) => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => onSubmit(email, password)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Title>Register page</Title>
                {auth.error.type === "register" ? <AlertContainer>
                                    <AlertText width="100%" textAlign="center"> Error! {auth.error.message} </AlertText>
                               </AlertContainer>: null}
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