import styled from "styled-components/native";

export const Container = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 10px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 20px;
    max-height: 90%;
`

export const ButtonContainer = styled.View`
    align-items: center;
    gap: 10px;
    paddingTop: 30px;
`

export const ButtonContainerProfile = styled.View`
    align-items: center;
    gap: 10px;
    paddingTop: 10px;
`

export const Input = styled.TextInput`
    height: 50px;
    padding-horizontal: 20px;
    border-color: red;
    border-width: 1px;
    border-radius: 7px;
    background-color: white;
`

export const Button = styled.Pressable`
    background-color: #007260;
    height: 45px;
    width: 200px;
    border-color: gray;
    border-width: 1px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;
export const Title = styled.Text`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    paddingBottom: 10px;
`
export const AlertContainerError = styled.View`
    margin: 0 -30px 0 -30px;
    align-items: center;
    justify-content: center;
    padding: 10px 0 10px 0;
    background-color: #fed7d7;
    border-color: #c53030;
    border-width: 1px;
    border-radius: 7px;
`;

export const AlertTextError = styled.Text`
    color: #2d3753;
    text-align: center;
`;

export const AlertContainerSuccess = styled.View`
    margin: 0 -30px 0 -30px;
    align-items: center;
    justify-content: center;
    padding: 10px 0 10px 0;
    background-color: #c6f6d5;
    border-color: #2f855a;
    border-width: 1px;
    border-radius: 7px;
`;

export const AlertTextSuccess = styled.Text`
    color: #2d3753;
    text-align: center;
`;

export const TextContainer = styled.View`
    display: flex;
    flex-direction: row;
    gap: 2px;
`
export const Separator = styled.View`
    borderBottomColor: #CCCCCC;
    borderBottomWidth: 1px;
    marginVertical: 10px;
`

export const TextTitle = styled.Text`
    font-weight: bold;
`
export const TextTitleCentered = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`

export const GameList = styled.ScrollView`
    margin: 0 -30px 0 -30px;
`

export const Row = styled.View`

    display: flex;
    flex-direction: row;
`

export const Cell = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border: 1px solid;
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TableContainer = styled.View`
    align-items: center
`