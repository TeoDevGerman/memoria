
import { useLoaderData, useNavigate } from 'react-router-dom'
import './App.css'
import { Memo } from './scss/types.ts'
import memoDB from './scss/db.ts'



function MemoPage() {
  const navigate = useNavigate()
  const memo = useLoaderData() as Memo

  const handle = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (event.target === null) return
    //console.log(event.target)
    const target = event.target as typeof event.target & {
      text: { value: string };
      deadline: { value: string };
      progress: { value: string };
    };
    const text = target.text.value;
    //console.log(text)
    const date = target.deadline.value;
    //console.log(date)
    const progress = target.progress.value;

    if (!isValidText(text)) {
      alert('Bitte gib einen Text von höchsten 160 Zeichen an')
      return
    }
    

    if (!isValidProgress(Number(progress))) {
      alert('Bitte gib dein Progress als Zahl zwischen 0 und 100 an')
      return
    }

    if (!isValidDate(new Date(date))) {
      alert('Bitte gib ein gültiges Datum ein')
      return
    }
    //console.log(progress)
    const i = memoDB.indexof(memo)
    memoDB.memos[i].text = text
    memoDB.memos[i].deadline = new Date(date)
    memoDB.memos[i].progress = Number(progress)
    memoDB.toCookies()
    navigate(-1)
  }
  const isValidText = (t: string) => {
    return 161 > t.length && t.length > 0
  }

  const isValidProgress = (p: number) => {
    return p >= 0 && p <= 100
  }

  const isValidDate = (d: Date) => {
    return d instanceof Date && !isNaN(d.getTime());
  }

  return (
    <>
      <h1>MemoPage</h1>
     
      {/* // todo list */}
      <p>{memo.deadline.toDateString()}</p>
      {/* creates a form to edit the memo and shows already existing Information */}
      <form id='editForm' onSubmit={handle}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Deine Memo</label>
          <input defaultValue={memo.text} type="text" className="form-control" id="text" aria-describedby="text" name="text" />
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline Format: {memo.deadline.toLocaleDateString()}</label>
          <input defaultValue={memo.deadline.toLocaleDateString()} type="text" className="form-control" id="deadline" name="deadline" />
        </div>
        <div className="mb-3">
          <label htmlFor="progress" className="form-label">Dein Progress zwischen 1 und 100 %</label>
          <input defaultValue={memo.progress} type="number" className="form-control" id="progress" name="progress" />
        </div>
        <button type="submit"  className="btn btn-primary m-2">save</button>
        
        <button type='button' onClick={(event: React.SyntheticEvent) => {
          event.preventDefault()
          //console.log('remove')
          memoDB.removeMemo(memo)
          memoDB.toCookies()
          navigate(-1)
        }} className="btn btn-danger">remove</button>
      </form>
    </>
  )
}

export default MemoPage
