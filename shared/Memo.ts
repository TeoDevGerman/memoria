export interface Memo  {
    id: number;
    title: string;
    description: string;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}