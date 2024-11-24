import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const dbPromise = SQLite.openDatabaseAsync('medicamentsAlarmDatabase')

export async function createTable() {
    const db = await dbPromise
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS medicamentsAlarm (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nameMedicament TEXT,
            alarmHour INTEGER,
            frequencyMedicament INTEGER,
            especificDay TEXT,
            quantityMedicament TEXT );

            CREATE TABLE IF NOT EXISTS userProfile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nameUser TEXT,
            dateOfBirth TEXT,
            genery TEXT,
            photoProfile TEXT );
            `);
        // console.log('Tabela criada com sucesso!...')
    } catch (error) {
        console.log('Erro ao criar tabela: ', error)
    }
}

export async function getMedicament(nameMedicament?: string, alarmHour?: number,frequencyMedicament?:number,especificDay?:string, quantityMedicament?: string) {
    await createTable()
    const db = await dbPromise;
    try {
        await db.execAsync(`INSERT INTO medicamentsAlarm (nameMedicament,alarmHour,frequencyMedicament,especificDay,quantityMedicament) 
            VALUES ('${nameMedicament}','${alarmHour}','${frequencyMedicament}','${especificDay}','${quantityMedicament}')`)
        // console.log("Medicamento inserido com sucesso....")
    } catch (error) {
        console.log('Erro inserir medicamentos: ', error)
    }
}

export async function select() {
    createTable()
    const db = await dbPromise;
    let medicamentsList = []
    const allRows = await db.getAllAsync('SELECT * FROM medicamentsAlarm')
    type Medicament = {
        nameMedicament: string;
        alarmHour: number;
        frequencyMedicament: number
        especificDay: string
        quantityMedicament: string
        id: number

    }
    for (const [index, row] of allRows.entries()) {
        const medicament = row as Medicament
        medicamentsList.push({
            id: medicament.id,
            nameMedicament: medicament.nameMedicament,
            alarmHour: medicament.alarmHour,
            frequencyMedicament:medicament.frequencyMedicament,
            especificDay:medicament.especificDay,
            quantityMedicament: medicament.quantityMedicament
        });
    }
    return medicamentsList
}

export async function deleteItem(id:number) {
    createTable()
    const db = await dbPromise;
    try {
        await db.execAsync(`DELETE FROM medicamentsAlarm WHERE id = ${id}`);
        // console.log(`Item com id ${id} deletado com sucesso.`);
    } catch (error) {
        console.log('Erro ao deletar item: ', error);
    }
}

export async function deletedb() {
    const db = await dbPromise;
    try {
        await db.execAsync('DROP TABLE IF EXISTS medicamentsAlarm')
        // console.log("DELETADO COM com sucesso.")
    } catch (error) {
        console.log('Erro ao DELETAR BD: ', error)
    }
}