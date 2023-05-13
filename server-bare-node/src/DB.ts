import { Memo } from '@shared';
import { open } from 'sqlite';
import { Database } from 'sqlite/build/Database';
import sqlite3 from 'sqlite3';
import { memoSchema, memoToDbString } from './MemoSchema';
import { MemoUpdate } from './Validator';

export async function openDb() {
    console.log('Opening the database...');

    return open({
        filename: 'database.db',
        driver: sqlite3.Database,
    });
}

export class DB {
    constructor(private readonly db: Database) {}

    public async ensureTablesExist() {
        const schemaString = Object.entries(memoSchema)
            .map(([key, value]) => `${key} ${value}`)
            .join(', ');
        const query = `CREATE TABLE IF NOT EXISTS memos (${schemaString});`;
        await this.db.run(query);

        console.log(await this.db.all('SELECT * FROM memos LIMIT 5;'));
    }

    public async getAllMemos() {
        const query = 'SELECT * FROM memos;';
        return this.db.all(query);
    }

    public async getNotDeletedMemos() {
        const query = 'SELECT * FROM memos WHERE deletedAt IS NULL;';
        return this.db.all(query);
    }

    public async getMemoById(id: number) {
        const query = `SELECT * FROM memos WHERE id = ${id};`;
        return this.db.get(query);
    }

    public async insertMemo(memo: Omit<Memo, 'id'>) {
        const query = `INSERT INTO memos ${memoToDbString(memo)};`;
        console.log('\x1b[34m%s\x1b[0m', 'Inserting memo', query);
        return this.db.run(query);
    }

    public async deleteMemo(memoId: number) {
        const query = `UPDATE memos SET deletedAt = "${new Date().toISOString()}" WHERE id = ${memoId};`;
        console.log(query);

        return this.db.run(query);
    }

    public async updateMemo(memo: MemoUpdate) {
        const query = `UPDATE memos SET title = "${memo.title}", description = "${memo.description}", progress = "${memo.description}" WHERE id = ${memo.id};`;
        console.log(query);

        return this.db.run(query);
    }
}
