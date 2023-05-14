import { useMemosContext } from './useMemosContext';

export const OfflineAlert = () => {
    const { fetchMemos } = useMemosContext();
    return (
        <div className="alert alert-danger d-flex" role="alert">
            <div>
                Network error: Du arbeitest im Offline-Modus. Bearbeiten derzeit nicht möglich.
            </div>
            <button className="btn btn-outline-danger" onClick={fetchMemos}>
                Reconnect
            </button>
        </div>
    );
};
