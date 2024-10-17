import { Alert } from "react-native";
import db from "../index";

let tempParams = {}; 

const handleSignIn = async (email, password, navigation) => {
    if (!email || !password) {
        Alert.alert('Erro', 'Preencher todos os campos!');
        return;
    }

    try {
        if (!db) {
            console.error('Erro: Banco de dados não está definido corretamente.');
            return;
        }

        const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        
        if (result) {
            const nameResult = await db.getFirstAsync('SELECT name, password, xp FROM users WHERE email = ?', [email]);
            const name = nameResult ? nameResult.name : 'error'; 
            const xp = nameResult ? nameResult.xp : 'error';

            tempParams = { name, xp }; // Armazena temporariamente os parâmetros

            navigation.reset({
                index: 0,
                routes: [{ name: 'index' }]
            });
            
        } else {
            Alert.alert('Erro', 'Usuário não encontrado ou senha incorreta!');
        }
    } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao realizar o login: ' + error);
    }
};

export const getTempParams = () => {
    return tempParams; // Obtem os parâmetros temporários
}

export default handleSignIn;
