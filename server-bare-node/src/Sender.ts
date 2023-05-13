export const sendJSON = (res: any, data: any, statusCode: number = 200) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
};

export const sendError = (res: any, statusCode: number, message: string = '') => {
    res.statusCode = statusCode;
    res.write(message);
    res.end();
};