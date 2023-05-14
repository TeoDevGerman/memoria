export interface Memo {
    title: string;
    description: string;
    deadline: Date;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
