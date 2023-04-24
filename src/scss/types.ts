export interface Memo {
    id: number
    deadline: Date
    text: string
    progress: number
  }
export interface MemoList {
    memos: Memo[]
  }
  
