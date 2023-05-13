import { Memo } from '@shared';

export type MemoColumn = keyof Memo;
export type MemoSchema = { [key in MemoColumn]: string };

export const memoColumns: MemoColumn[] = [
    'id',
    'title',
    'description',
    'progress',
    'createdAt',
    'updatedAt',
    'deletedAt',
];

export const memoSchema: MemoSchema = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    title: 'TEXT',
    description: 'TEXT',
    progress: 'INTEGER',
    createdAt: 'DATE',
    updatedAt: 'DATE',
    deletedAt: 'DATE',
};

const mapValue = (value: unknown) => {
    if (value instanceof Date) return `"${value.toISOString()}"`;
    if (value === null) return 'NULL';
    return `"${value}"`;
};

export const memoToDbString = (memo: Omit<Memo, 'id'>) => {
    const entries = Object.entries(memo);
    return `(${entries.map(([key]) => key).join(', ')}) VALUES (${entries
        .map(([_, value]) => mapValue(value))
        .join(', ')} )`;
};
