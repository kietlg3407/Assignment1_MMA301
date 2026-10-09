
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Cannot save ${key}:`, error);
        throw error;
    }
}

export async function loadData(key, fallback) {
    try {
        const storedValue = await AsyncStorage.getItem(key);

        if (storedValue === null) {
            return fallback;
        }

        return JSON.parse(storedValue);
    } catch (error) {
        console.error(`Cannot load ${key}:`, error);
        return fallback;
    }
}