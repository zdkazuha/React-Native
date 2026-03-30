import { MiniToDo } from "../models/MiniToDo";
import * as schema from "@/services/db_schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { todosTable } from "./db_schema";
import { eq } from 'drizzle-orm';

type DrizzleDb = ExpoSQLiteDatabase<typeof schema> & {
  $client: SQLiteDatabase;
};

export async function addToDo(db: DrizzleDb, title: string, todo: string): Promise<MiniToDo> {
  const result = await db.insert(todosTable).values({ title: title,  todo: todo });
  return { id: Number(result.lastInsertRowId), title: title,  todo: todo } as MiniToDo;
}

export async function removeToDo(db: DrizzleDb, id: number): Promise<void> {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}

export async function updateToDo(db: DrizzleDb, id: number, title: string, todo: string): Promise<MiniToDo> {
  await db.update(todosTable).set({ id: id, title: title,  todo: todo }).where(eq(todosTable.id, id));
  return { id, title, todo } as MiniToDo;
}

export async function getAllToDos(db: DrizzleDb): Promise<MiniToDo[]> {
  const result = await db.select().from(todosTable).all();
  return result as MiniToDo[];
}