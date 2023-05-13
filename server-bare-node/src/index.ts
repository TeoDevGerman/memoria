import { DB, openDb } from './DB';
import { startServer } from './server';

console.log('Initializing server...');

openDb().then(async (dbConnection) => {
    const db = new DB(dbConnection);
    await db.ensureTablesExist();

    const server = startServer(db);

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
