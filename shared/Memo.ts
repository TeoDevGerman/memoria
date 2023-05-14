export interface MemoFromApi {
    _id: string;
    title: string;
    description: string;
    progress: number;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface MemoToAdd {
    title: string;
    description: string;
    progress: number;
    deadline: string;
}
