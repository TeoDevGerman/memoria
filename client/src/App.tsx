import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

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
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                        <Link to={'/'}>Memoria</Link>
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setDarkmode((currentDarkmodeSetting) => !currentDarkmodeSetting)
                        }
                        className="btn btn-primary"
                    >
                        {isDarmodeOn ? 'Turn the Lights on!' : 'Turn the Lights off!'}
                    </button>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
};
