import db from "../index";
import { Alert } from "react-native";

const handleResetPassword = async (email, newPassword) => {
    if (!email || !newPassword) {
        Alert.alert('Erro', 'Preencher todos os campos!');
        return;
    }

    try {
        // Verifica se o banco de dados está definido corretamente
        if (!db) {
            console.error('Erro: Banco de dados não está definido corretamente.');
            return;
        }

        // Verifica se o usuário com o e-mail fornecido existe no banco de dados
        const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);

        if (result) {
            // Usuário encontrado, atualiza a senha
            await db.runAsync('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
            Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        } else {
            // Usuário não encontrado
            Alert.alert('Erro', 'Usuário não encontrado!');
        }
    } catch (error) {
        // Se ocorrer um erro, exibe um alerta de erro
        Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha: ' + error);
    }
};

    /*db.withTransactionSync(
        tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        tx.executeSql(
                            'UPDATE users SET password = ? WHERE email = ?',
                            [newPassword, email],
                            () => {
                                Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
                                navigation.navigate('SignIn');
                            },
                            (_, error) => {
                                Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha: ' + error);
                            }
                        );
                    } else {
                        Alert.alert('Erro', 'E-mail não encontrado!');
                    }
                },
                (_, error) => {
                    Alert.alert('Erro', 'Ocorreu um erro ao verificar o e-mail: ' + error);
                }
            );
        },
        null,
        null
    );*/

export default handleResetPassword;
