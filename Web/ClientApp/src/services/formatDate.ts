﻿// YYYY-MM-DD
export const formatDate = (date: string): string => {
    let formattedDate = "";
    if (date)
        formattedDate = date.substring(0, 10);

    return formattedDate;
};

// YYYY-MM-DD
export const getTodaysFormattedDate = (): string => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    return formattedDate;
};