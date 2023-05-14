import { MemoToAdd } from '@shared';
import { useNavigate } from 'react-router-dom';
import { useMemosContext } from './useMemosContext';

export const AddMemo = () => {
    const navigate = useNavigate();

    const { addMemo } = useMemosContext();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
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

        addMemo(memo);
        navigate(-1);
    };

    return (
        <>
            <h1>Memo hinzufügen</h1>

            <form id="editForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">
                        Titel
                    </label>
                    <input
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
                        Deadline
                    </label>
                    <input type="date" className="form-control" id="deadline" name="deadline" />
                </div>
                <div className="mb-3">
                    <label htmlFor="progress" className="form-label">
                        Progress
                    </label>
                    <input
                        placeholder="Fortschritt in %"
                        type="number"
                        className="form-control"
                        id="progress"
                        name="progress"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    add
                </button>
            </form>
        </>
    );
};
