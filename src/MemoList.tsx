import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Memo } from './Memo';
import { memoDB } from './db';

export const MemoList = () => {
    const [memos, setMemos] = useState<Memo[]>([]);

    useEffect(() => setMemos(memoDB.getMemos()), []);

    return (
        <>

            {/* todo list */}
            <div className="container text-center">
                <div className="row row-cols-auto">
                    {memos.map((memo) => (
                        <div className="card col m-4 p-2" key={memo.id}>
                            <div className="card-body">
                                <h5 className="card-title">#{memo.id} Memo</h5>
                                <p className="card-text">{memo.text}</p>
                                <p className="card-text">{memo.deadline.toLocaleDateString()}</p>
                                <p className="card-text">{memo.progress}%</p>
                                <Link to={`MemoPage/${memo.id}`} className="btn btn-primary">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Link to="/AddMemo">
                <button type="button" className="btn btn-primary">
                    Add Memo
                </button>
            </Link>

            <footer>
                <Link to="/Impressum">Impressum</Link>
            </footer>
        </>
    );
};
