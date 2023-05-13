import { Memo } from "@shared";

class MemoList {
    memos: Memo[];

    constructor() {
        this.memos = [];
    }

    addMemo(memo: Memo) {
        this.memos.push(memo);
    }

    getMemos() {
        return this.memos;
    }

    contains(memo: Memo) {
        for (let i = 0; i < this.memos.length; i++) {
            if (this.memos[i].id === memo.id) {
                return true;
            }
        }
        return false;
    }

    indexof(memo: Memo) {
        for (let i = 0; i < this.memos.length; i++) {
            if (this.memos[i].id === memo.id) {
                return i;
            }
        }
        return -1;
    }

    removeMemo(memo: Memo) {
        if (this.contains(memo)) {
            this.memos.splice(this.indexof(memo), 1);
        }
    }

    fromCookies() {
        const memos = document.cookie.split(';');
        for (let i = 0; i < memos.length; i++) {
            const memo = memos[i].split('=');
            if (memo.length < 2) continue;
            const memoObject = JSON.parse(memo[1]);
            const tempMemo: Memo = {
                id: memoObject.id,
                deadline: new Date(memoObject.deadline),
                text: memoObject.text,
                progress: memoObject.progress,
            };
            this.addMemo(tempMemo);
        }
    }

    toCookies() {
        document.cookie.split(';').forEach((c) => {
            document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        for (let i = 0; i < this.memos.length; i++) {
            const memo = this.memos[i];
            document.cookie = memo.id + '=' + JSON.stringify(memo);
        }
    }
}

const memoDB = new MemoList();
memoDB.fromCookies();

export { memoDB };