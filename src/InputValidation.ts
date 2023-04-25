export const isValidText = (t: string) => {
    return 161 > t.length && t.length > 0;
};

export const isValidProgress = (p: number) => {
    return p >= 0 && p <= 100;
};

export const isValidDate = (d: Date) => {
    return d instanceof Date && !isNaN(d.getTime());
};
