export const getItemLocalStorage = (key: string) => {
    if (typeof localStorage === "undefined") {
        return null;
    }
    return localStorage.getItem(key);
};

export const setItemLocalStorage = (key: string, value: string) => {
    if (typeof localStorage === "undefined") {
        return null;
    }
    localStorage.setItem(key, value);
};
