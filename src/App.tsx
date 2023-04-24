import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import memoDB from './scss/db'

interface TodoItem {
  id: number
  deadline: Date
  text: string
  progress: number
}
// dashboard with all todos in a grid // almost done
// todo detail page with edit // done
// todo create page with button
// add impressum // done



function App() {
  const [memos, setMemos] = useState<TodoItem[]>([])

  useEffect(() => {
    setMemos(memoDB.getMemos())
  }, [])
  return (
    <>
      <h1>Memoria</h1>
      {/* // todo list */}
      <div className='memosTable'>
        <div className="row row-cols-3">
          {memos.map((memo) => (
            <Link to={`MemoPage/${memo.id}`}>
              {/* wir sind hier im Grid */}
              <div key={memo.id}>
                <h2>{memo.text}</h2>
                <p>{memo.deadline.toISOString()}</p>
                <p>{memo.progress}%</p>
              </div>
              {/* wir sind hier im Grid */}
            </Link>
          ))}
        </div>
      </div>
      <button className="btn btn-primary">add new Memo</button>
      <footer>
        <Link to="/Impressum">
          Impressum
        </Link>
      </footer>
    </>
  )
}

export default App
