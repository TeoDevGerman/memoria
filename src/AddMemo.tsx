import { useNavigate } from 'react-router-dom';
import { isValidDate, isValidProgress, isValidText } from './InputValidation';
import { Memo } from './Memo';
import { memoDB } from './db';

export const AddMemo = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (event.target === null) return;

        const target = event.target as typeof event.target & {
            text: { value: string };
            deadline: { value: string };
            progress: { value: string };
        };

        const text = target.text.value;
        const date = target.deadline.value;
        const progress = target.progress.value;

        if (!isValidText(text)) {
            alert('Bitte gib einen Text von höchsten 160 Zeichen an');
            return;
        }

        if (!isValidProgress(Number(progress))) {
            alert('Bitte gib dein Progress als Zahl zwischen 0 und 100 an');
            return;
        }

        if (!isValidDate(new Date(date))) {
            alert('Bitte gib ein gültiges Datum ein');
            return;
        }

        const memo: Memo = {
            id: memoDB.memos.length,
            text: text,
            deadline: new Date(date),
            progress: Number(progress),
        };

        memoDB.addMemo(memo);
        memoDB.toCookies();
        navigate(-1);
    };

    return (
        <>
            <h1>AddMemoPage</h1>
            <form id="editForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">
                        Text
                    </label>
                    <input
                        placeholder="Deine Memo"
                        type="text"
                        className="form-control"
                        id="text"
                        aria-describedby="text"
                        name="text"
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
