import React, { createContext, useContext, useEffect, useState } from 'react';

import { loadData, saveData } from '../services/storage';

const DEFAULT_PROFILE = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: '',
    bio: '',
};
const DEFAULT_THEME = 'light';
const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadAppData() {
            const [storedProfile, storedTheme] = await Promise.all([
                loadData('profile', DEFAULT_PROFILE),
                loadData('theme', DEFAULT_THEME),
            ]);

            if (isMounted) {
                const validProfile =
                    storedProfile && typeof storedProfile === 'object'
                        ? storedProfile
                        : {};

                setProfile({ ...DEFAULT_PROFILE, ...validProfile });
                setTheme(storedTheme === 'dark' ? 'dark' : DEFAULT_THEME);
                setIsLoaded(true);
            }
        }

        loadAppData();

        return () => {
            isMounted = false;
        };
    }, []);

    async function updateProfile(updates) {
        const updatedProfile = { ...profile, ...updates };
        await saveData('profile', updatedProfile);
        setProfile(updatedProfile);
    }

    async function toggleTheme() {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        await saveData('theme', nextTheme);
        setTheme(nextTheme);
    }

    return (
        <AppContext.Provider
            value={{ profile, theme, isLoaded, updateProfile, toggleTheme }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used inside an AppProvider.');
    }

    return context;
}