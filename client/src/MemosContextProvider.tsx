import { MemoToAdd } from '@shared';
import { ReactNode, useEffect, useState } from 'react';
import { isValidDate, isValidProgress, isValidText } from './InputValidation';
import { MemosContext } from './MemoContext';
import { MemosState } from './MemosState';
import { memoDB } from './db';

const validateMemo = (memo: MemoToAdd) => {
    if (!isValidText(memo.title)) {
        alert('Bitte gib einen Titel von höchsten 160 Zeichen an');
        return false;
    }

    if (!isValidProgress(+memo.progress)) {
        alert('Bitte gib dein Progress als Zahl zwischen 0 und 100 an');
        return false;
    }

    if (!isValidDate(new Date(memo.deadline))) {
        alert('Bitte gib ein gültiges Datum ein');
        return false;
    }
    return true;
};

export const MemosContextProvider = ({ children }: { children: ReactNode }) => {
    const [memosState, setMemosState] = useState<MemosState>({ type: 'LOADING' });

    const MEMO_URL = 'http://localhost:3000/memo';

    const fetchMemos = async () => {
        try {
            const controller = new AbortController();

            const timeout = setTimeout(() => controller.abort(), 10000);

            const res = await fetch(MEMO_URL, { signal: controller.signal });

            const memos = await res.json();

            clearTimeout(timeout);
            setMemosState({ type: 'DATA', memos });
            memoDB.setMemos(memos);
            memoDB.toCookies();
        } catch (e) {
            if (e instanceof Error) {
                if (e.name === 'AbortError')
                    return setMemosState({
                        type: 'NETWORK_ERROR',
                        message: 'Network error',
                        memos: memoDB.getMemos(),
                    });
                setMemosState({ type: 'ERROR', message: e.message });
            }

            setMemosState({ type: 'ERROR', message: 'Unknown error' });
        }
    };

    const addMemo = async (memo: MemoToAdd) => {
        if (memosState.type !== 'DATA') return;
        if (!validateMemo(memo)) return;

        try {
            const res = await fetch(MEMO_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memo),
            });

            const addedMemo = await res.json();
            setMemosState({ type: 'DATA', memos: [...memosState.memos, addedMemo] });
            memoDB.setMemos([...memosState.memos, addedMemo]);
            memoDB.toCookies();
        } catch (e) {
            if (e instanceof Error) {
                setMemosState({ type: 'ERROR', message: e.message });
            }

            setMemosState({ type: 'ERROR', message: 'Unknown error' });
        }
    };

    const updateMemo = async (memoId: string, memo: MemoToAdd) => {
        if (memosState.type !== 'DATA') return;
        if (!validateMemo(memo)) return;

        try {
            const res = await fetch(MEMO_URL + '/' + memoId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memo),
            });

            const updatedMemo = await res.json();

            const memos = memosState.memos.map((m) =>
                m._id === updatedMemo._id ? updatedMemo : m
            );

            setMemosState({ type: 'DATA', memos });

            memoDB.setMemos(memos);
            memoDB.toCookies();
        } catch (e) {
            if (e instanceof Error) {
                setMemosState({ type: 'ERROR', message: e.message });
            }

            setMemosState({ type: 'ERROR', message: 'Unknown error' });
        }
    };

    const deleteMemo = async (memoId: string) => {
        if (memosState.type !== 'DATA') return;

        try {
            const res = await fetch(MEMO_URL + '/' + memoId, {
                method: 'DELETE',
            });

            const deletedMemo = await res.json();

            const memos = memosState.memos.filter((m) => m._id !== deletedMemo._id);

            setMemosState({ type: 'DATA', memos });

            memoDB.setMemos(memos);
            memoDB.toCookies();
        } catch (e) {
            if (e instanceof Error) {
                setMemosState({ type: 'ERROR', message: e.message });
            }

            setMemosState({ type: 'ERROR', message: 'Unknown error' });
        }
    };

    useEffect(() => {
        setMemosState({ type: 'DATA', memos: memoDB.getMemos() });
        fetchMemos();
    }, []);

    return (
        <MemosContext.Provider
            value={{ state: memosState, addMemo, fetchMemos, updateMemo, deleteMemo }}
        >
            {children}
        </MemosContext.Provider>
    );
};
