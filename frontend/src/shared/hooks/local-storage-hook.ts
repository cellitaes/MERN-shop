import { useState } from 'react';

interface ObjectValue {
    [key: string]: any;
}

export const useLocalStorage = (key: string) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            return null;
        }
    });

    const setValue = (value: ObjectValue) => {
        try {
            setLocalStorageValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('local storage error', error);
        }
    };

    const remove = () => {
        window.localStorage.removeItem(key);
        setLocalStorageValue(null);
    };
    return { value: localStorageValue, setValue, remove };
};
