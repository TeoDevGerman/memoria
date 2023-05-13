export interface MemoToAdd {
    title: string;
    description: string;
    progress: number;
}
export const validateTaskAddBody = (body: string): MemoToAdd | undefined => {
    try {
        const task: unknown = JSON.parse(body);
        if (!task || typeof task !== 'object') {
            throw new Error('Task must exist');
        }
        if (!('title' in task) || typeof task.title !== 'string') {
            throw new Error('Task must have a title');
        }
        if (!('description' in task) || typeof task.description !== 'string') {
            throw new Error('Task must have a description');
        }
        if (!('progress' in task) || typeof task.progress !== 'number') {
            throw new Error('Task must have a numeric progress');
        }
        // make sure no other properties are defined
        if (Object.keys(task).length !== 3) {
            throw new Error('Invalid task body - extra properties');
        }
        return task as MemoToAdd;
    } catch (error) {
        console.error('Invalid task body', error, body);
        return undefined;
    }
};

export interface MemoUpdate {
    id: number;
    title: string;
    description: string;
    progress: number;
}
export const validatUpdateTaskBody = (body: string): MemoUpdate | undefined => {
    try {
        const task: unknown = JSON.parse(body);
        if (!task || typeof task !== 'object') {
            throw new Error('Task must exist');
        }
        if (!('id' in task) || typeof task.id !== 'number') {
            throw new Error('Task must have a id');
        }
        if (!('title' in task) || typeof task.title !== 'string') {
            throw new Error('Task must have a title');
        }
        if (!('description' in task) || typeof task.description !== 'string') {
            throw new Error('Task must have a description');
        }
        if (!('progress' in task) || typeof task.progress !== 'number') {
            throw new Error('Task must have a numeric progress');
        }
        // make sure no other properties are defined
        if (Object.keys(task).length !== 4) {
            throw new Error('Invalid task body - extra properties');
        }

        return task as MemoUpdate;
    } catch (error) {
        console.error('Invalid task body', error, body);
        return undefined;
    }
};
