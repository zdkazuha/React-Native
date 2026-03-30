import { MiniToDo } from "../models/MiniToDo";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseSync("todos.db");

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL, 
        todo TEXT NOT NULL
      );
      INSERT INTO todos (title, todo) VALUES ('Title 1', 'ToDo 1');
      INSERT INTO todos (title, todo) VALUES ('Title 2', 'ToDo 2');
      INSERT INTO todos (title, todo) VALUES ('Title 3', 'ToDo 3');
    `);
  }
  
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function addItem(title: string, todo: string): Promise<MiniToDo> {
  const result = await db.runAsync(
    `INSERT INTO todos (title, todo) VALUES (?, ?);`, 
    [title, todo]
  );
  
  return { 
    id: result.lastInsertRowId, 
    title, 
    todo 
  } as MiniToDo;
}

export async function deleteItem(id: number) {
  await db.runAsync(`DELETE FROM todos WHERE id = ?;`, [id]);
}

export async function updateItem(item: MiniToDo) {
  await db.runAsync(
    `UPDATE todos SET title = ?, todo = ? WHERE id = ?;`, 
    [item.title, item.todo, item.id]
  );
}

export async function getItems() {
  return await db.getAllAsync<MiniToDo>("SELECT * FROM todos;");
}