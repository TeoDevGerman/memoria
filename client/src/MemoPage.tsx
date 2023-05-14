import { MemoToAdd } from '@shared';
import { useNavigate, useParams } from 'react-router-dom';
import { OfflineAlert } from './OfflineAlert';
import { useMemosContext } from './useMemosContext';

export const MemoPage = () => {
    const navigate = useNavigate();
    const memoId = useParams().memoId;

    const { state, updateMemo, deleteMemo } = useMemosContext();

    const memo =
        state.type === 'DATA' || state.type === 'NETWORK_ERROR'
            ? state.memos.find((memo) => memo._id === memoId)
            : undefined;

    const dateToFormat = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!memoId) return;
        if (event.target === null) return;

        const target = event.target as typeof event.target & {
            title: { value: string };
            description: { value: string };
            deadline: { value: string };
            progress: { value: string };
        };

        const title = target.title.value;
        const description = target.description.value;
        const date = target.deadline.value;
        const progress = target.progress.value;

        const memo: MemoToAdd = {
            title,
            description,
            deadline: new Date(date).toISOString(),
            progress: Number(progress),
        };
        updateMemo(memoId, memo);
        navigate(-1);
    };

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

    if (!memo) {
        return <div>Memo not found</div>;
    }

    return (
        <>
            {state.type === 'NETWORK_ERROR' && <OfflineAlert />}

            <h2>{memo.title}</h2>
            <p>{new Date(memo.deadline).toDateString()}</p>
            <form id="editForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">
                        Titel
                    </label>
                    <input
                        defaultValue={memo.title}
                        placeholder="Deine Memo"
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="title"
                        name="title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">
                        Description
                    </label>
                    <input
                        defaultValue={memo.description}
                        placeholder="Beschreibung (optional)"
                        type="text"
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        name="description"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">
                        Deadline Format: {dateToFormat(new Date(memo.deadline))}
                    </label>
                    <input
                        defaultValue={dateToFormat(new Date(memo.deadline))}
                        type="text"
                        className="form-control"
                        id="deadline"
                        name="deadline"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="progress" className="form-label">
                        Dein Progress zwischen 1 und 100 %
                    </label>
                    <input
                        defaultValue={memo.progress}
                        type="number"
                        className="form-control"
                        id="progress"
                        name="progress"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary m-2"
                    disabled={state.type === 'NETWORK_ERROR'}
                >
                    Save
                </button>

                <button
                    type="button"
                    onClick={(event: React.SyntheticEvent) => {
                        event.preventDefault();
                        if (!memoId) return;
                        deleteMemo(memoId);
                        navigate(-1);
                    }}
                    className="btn btn-danger"
                    disabled={state.type === 'NETWORK_ERROR'}
                >
                    Remove
                </button>

                <button
                    className="btn btn-secondary m-2"
                    onClick={() => navigate('/')}
                    disabled={state.type === 'NETWORK_ERROR'}
                >
                    Cancel
                </button>
            </form>
        </>
    );
};
