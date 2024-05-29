import db from "../index";
import { Alert } from "react-native";

const handleSignUp = async (name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, navigation) => {
    if (!name || !email || !password || !confirmPassword) {
        Alert.alert('Erro', 'Preencher todos os campos!');
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
    }

    if (!db) {
        console.error('Erro: Banco de dados não está definido corretamente.');
        return;
    }

    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                name TEXT PRIMARY KEY, 
                email TEXT, 
                password TEXT, 
                xp INTEGER DEFAULT 0,
                metasConc INTEGER DEFAULT 0
            );
        `);

        const columnExists = await db.getAllAsync('PRAGMA table_info(users);');
        const xpColumn = columnExists.find(column => column.name === 'xp');
        const metasConcColumn = columnExists.find(column => column.name === 'metasConc');

        if (!xpColumn) {
            await db.execAsync('ALTER TABLE users ADD COLUMN xp INTEGER DEFAULT 0;');
        }

        if (!metasConcColumn) {
            await db.execAsync('ALTER TABLE users ADD COLUMN metasConc INTEGER DEFAULT 0;');
        }

        const emailRows = await db.getAllAsync('SELECT * FROM users WHERE email = ?', [email]);
        const nameRows = await db.getAllAsync('SELECT * FROM users WHERE name = ?', [name]);

        if (emailRows.length > 0 || nameRows.length > 0) {
            Alert.alert('Erro', 'Este e-mail ou nome de usuário já está cadastrado!');
        } else {
            const result = await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
            if (result) {
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignIn' }],
                    });
                }
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao cadastrar usuário.');
            }
        }
    } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar usuário: ' + error.message);
        console.error(error);
    }
};

export default handleSignUp;
