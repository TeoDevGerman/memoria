import { MemoFromApi } from '@shared';

class MemoList {
    private memos: MemoFromApi[];

    constructor() {
        this.memos = [];
    }

    setMemos(memos: MemoFromApi[]) {
        this.memos = memos;
    }

    getMemos() {
        return this.memos;
    }

    fromCookies() {
        const memos = document.cookie.split(';');

        const tempMemos: MemoFromApi[] = [];
        for (let i = 0; i < memos.length; i++) {
            const memo = memos[i].split('=');
            if (memo.length < 2) continue;
            const memoObject = JSON.parse(memo[1]);
            const tempMemo: MemoFromApi = {
                _id: memoObject._id,
                deadline: memoObject.deadline,
                title: memoObject.title,
                description: memoObject.description,
                progress: memoObject.progress,
                createdAt: memoObject.createdAt,
                updatedAt: memoObject.updatedAt,
                deletedAt: memoObject.deletedAt,
            };
            tempMemos.push(tempMemo);
        }
        this.setMemos(tempMemos);
    }

    toCookies() {
        document.cookie.split(';').forEach((c) => {
            document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        for (let i = 0; i < this.memos.length; i++) {
            const memo = this.memos[i];
            document.cookie = memo._id + '=' + JSON.stringify(memo);
        }
    }
}

const memoDB = new MemoList();
memoDB.fromCookies();

export { memoDB };
