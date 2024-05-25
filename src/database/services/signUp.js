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

    // Verifica se o banco de dados está definido corretamente
    if (!db) {
        console.error('Erro: Banco de dados não está definido corretamente.');
        return;
    }

    try {
        // Cria a tabela se ela não existir
        await db.execAsync('CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, email TEXT, password TEXT, xp INTEGER DEFAULT 0);');

        // Verifica se a coluna 'xp' já existe
        const columnExists = await db.getAllAsync('PRAGMA table_info(users);');
        const xpColumn = columnExists.find(column => column.name === 'xp');

        // Adiciona a coluna 'xp' se não existir
        if (!xpColumn) {
            await db.execAsync('ALTER TABLE users ADD COLUMN xp INTEGER DEFAULT 0;');
        }

        // Verifica se o email já está cadastrado
        const emailRows = await db.getAllAsync('SELECT * FROM users WHERE email = ?', [email]);
        const nameRows = await db.getAllAsync('SELECT * FROM users WHERE name = ?', [name]);
        
        if (emailRows.length > 0 || nameRows.length > 0) {
            // Se o e-mail ou nome já estiverem cadastrados, exibe um alerta de erro
            Alert.alert('Erro', 'Este e-mail ou nome de usuário já está cadastrado!');
        } else {
            // Insere um novo usuário
            const result = await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
            if (result) {
                // Limpa os campos do formulário
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                // Exibe um alerta de sucesso
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                // Verifica se a rota 'SignIn' existe
                if (navigation.canGoBack()) {
                    navigation.goBack(); // Volta para a tela de login se possível
                } else {
                    navigation.reset({ // Redefine a navegação para a tela de login
                        index: 0,
                        routes: [{ name: 'SignIn' }],
                    });
                }
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao cadastrar usuário.');
            }
        }
    } catch (error) {
        // Se ocorrer um erro ao cadastrar o usuário, exibe um alerta de erro
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar usuário: ' + error.message);
        console.error(error); // Adiciona esta linha para obter mais detalhes no console
    }
};

export default handleSignUp;
