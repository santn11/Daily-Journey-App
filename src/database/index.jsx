import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync('db.db');

export default db;