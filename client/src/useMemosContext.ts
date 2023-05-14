import { useContext } from 'react';
import { MemosContext } from './MemoContext';

export const useMemosContext = () => {
    const ctx = useContext(MemosContext);
    if (!ctx) throw new Error('Component beyond MemosContext!');
    return ctx;
};
