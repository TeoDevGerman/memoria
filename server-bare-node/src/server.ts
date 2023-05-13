import { createServer } from 'http';
import { parse } from 'url';
import { DB } from './DB';
import { sendError, sendJSON } from './Sender';
import { validatUpdateTaskBody, validateTaskAddBody } from './Validator';

export const startServer = (db: DB) =>
    createServer(async (req, res) => {
        if (!req.url) return sendError(res, 400);

        const url = parse(req.url);

        console.log('\x1b[34m%s\x1b[0m', `${req.method} ${url.pathname} ${url.query}`);

        switch (url.pathname) {
            case '/': {
                switch (req.method) {
                    case 'GET':
                        if (!url.query) {
                            return sendJSON(res, await db.getNotDeletedMemos());
                        }
                        const params = new URLSearchParams(url.query);
                        if (params.has('includeDeleted'))
                            return sendJSON(res, await db.getAllMemos());
                        return sendError(res, 400);
                    default:
                        return sendError(res, 405);
                }
            }

            case '/task': {
                switch (req.method) {
                    case 'GET': {
                        if (!url.query) return sendError(res, 400, 'Task id required');
                        const params = new URLSearchParams(url.query);
                        if (!params.has('id')) return sendError(res, 400, 'Task id required');
                        const id = +(params.get('id') ?? -1);
                        if (isNaN(id) || id < 0) return sendError(res, 400, 'Invalid task id');

                        const task = await db.getMemoById(id);

                        if (!task) return sendError(res, 404, 'Task not found');
                        return sendJSON(res, task);
                    }
                    case 'POST': {
                        const requestBody: any[] = [];

                        req.on('data', (chunks) => requestBody.push(chunks));

                        req.on('end', async () => {
                            const parsedData = Buffer.concat(requestBody).toString();

                            const task = validateTaskAddBody(parsedData);

                            if (!task) return sendError(res, 400, 'Invalid task body');

                            const newTask = {
                                ...task,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                deletedAt: null,
                            };

                            console.log(
                                '\x1b[35m%s\x1b[0m',
                                'Adding new task',
                                JSON.stringify(newTask, null, 4)
                            );

                            const dbRes = await db.insertMemo(newTask);

                            sendJSON(res, { ...newTask, id: dbRes.lastID }, 201);
                        });
                        return;
                    }
                    case 'PUT': {
                        const requestBody: any[] = [];
                        req.on('data', (chunks) => requestBody.push(chunks));

                        req.on('end', async () => {
                            const parsedData = Buffer.concat(requestBody).toString();

                            const taskOrUndefined = validatUpdateTaskBody(parsedData);

                            if (!taskOrUndefined) return sendError(res, 400, 'Invalid task body');

                            await db.updateMemo(taskOrUndefined);
                            const updatedMemo = await db.getMemoById(taskOrUndefined.id);

                            if (!updatedMemo) return sendError(res, 404);
                            sendJSON(res, updatedMemo, 201);
                        });
                        return;
                    }

                    case 'DELETE': {
                        if (!url.query) return sendError(res, 400, 'Task id required');

                        const params = new URLSearchParams(url.query);

                        if (!params.has('id')) return sendError(res, 400, 'Task id required');

                        const id = +(params.get('id') ?? -1);

                        if (typeof id !== 'number' || isNaN(id) || id < 0)
                            return sendError(res, 400, 'Invalid task id');

                        await db.deleteMemo(id);
                        const updatedMemo = await db.getMemoById(id);

                        if (!updatedMemo) return sendError(res, 404);
                        return sendJSON(res, updatedMemo);
                    }
                }
            }
            default:
                sendError(res, 404);
        }
    });
