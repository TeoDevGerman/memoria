import { MemoFromApi } from '@shared';

export type MemosState =
    | { type: 'LOADING' }
    | { type: 'ERROR'; message: string }
    | { type: 'NETWORK_ERROR'; message: string; memos: MemoFromApi[] }
    | { type: 'DATA'; memos: MemoFromApi[] };
