import { MemoToAdd } from '@shared';
import { createContext } from 'react';
import { MemosState } from './MemosState';

interface MemosContext {
    state: MemosState;
    fetchMemos: () => void;
    addMemo: (memo: MemoToAdd) => void;
    updateMemo: (memoId: string, memo: MemoToAdd) => void;
    deleteMemo: (memoId: string) => void;
}

export const MemosContext = createContext<MemosContext | undefined>(undefined);
