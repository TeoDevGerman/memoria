import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const App = () => {
    const [isDarmodeOn, setDarkmode] = useState(false);
    useEffect(() => {
        if (isDarmodeOn) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
        }
    }, [isDarmodeOn]);
    return (
        <>
            <h1>Memoria</h1>
            <button
                type="button"
                onClick={() => setDarkmode((currentDarkmodeSetting) => !currentDarkmodeSetting)}
                className="btn btn-primary"
            >
                {isDarmodeOn ? 'Turn the Lights on!' : 'Turn the Lights off!'}
            </button>
            <div>
                <Outlet />
            </div>
        </>
    );
};
