import { Link } from 'react-router-dom';
import { OfflineAlert } from './OfflineAlert';
import { useMemosContext } from './useMemosContext';

export const MemoList = () => {
    const { state } = useMemosContext();

    if (state.type === 'LOADING') {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    if (state.type === 'ERROR') {
        return <div>An error occured: {state.message}</div>;
    }

    return (
        <>
            {state.type === 'NETWORK_ERROR' && <OfflineAlert />}

            <div className="container text-center">
                <div className="row">
                    {state.memos.map((memo) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2">
                            <div className="card col p-2" key={memo._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{memo.title}</h5>
                                    <p className="card-text">{memo.description}</p>
                                    <p className="card-text">
                                        {new Date(memo.deadline).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">{memo.progress}%</p>
                                    <Link to={`MemoPage/${memo._id}`} className="btn btn-primary">
                                        Edit
                                    </Link>
                                </div>
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
