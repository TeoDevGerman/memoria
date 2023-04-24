
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
    console.log(text)
    const date = target.deadline.value;
    console.log(date)
    const progress = target.progress.value;
    console.log(progress)
    const i = memoDB.indexof(memo)
    memoDB.memos[i].text = text
    memoDB.memos[i].deadline = new Date(date)
    memoDB.memos[i].progress = Number(progress)
    memoDB.toCookies()
    navigate(-1)
  }
  return (
    <>
      <h1>MemoPage</h1>
      {/* // todo list */}
      <p>{memo.deadline.toISOString()}</p>
      {/* create a form to edit the memo */}
      <form id='editForm' onSubmit={handle}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Text</label>
          <input type="text" className="form-control" id="text" aria-describedby="text" name="text"/>
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline</label>
          <input type="date" className="form-control" id="deadline" name="deadline"/>
        </div>
        <div className="mb-3">
          <label htmlFor="progress" className="form-label">Progress</label>
          <input type="number" className="form-control" id="progress" name="progress" />
        </div>
        <button type="submit" className="btn btn-primary">save</button>
      </form>
    </>
  )
}

export default MemoPage
