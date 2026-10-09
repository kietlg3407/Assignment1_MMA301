
import React from 'react';
import {
    Alert,
    Switch,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
    const { theme, toggleTheme, isLoaded } = useApp();
    const dark = theme === 'dark';

    async function handleThemeChange() {
        try {
            await toggleTheme();
        } catch (error) {
            console.error('Cannot update theme:', error);
            Alert.alert('Save Error', 'Your theme preference could not be saved.');
        }
    }

    return (
        <ScreenContainer title="Settings">
            <View
                style={[
                    styles.card,
                    { backgroundColor: dark ? '#1F2937' : '#FFFFFF' },
                ]}
            >
                <View style={styles.row}>
                    <View style={styles.textArea}>
                        <Text
                            style={[
                                styles.settingTitle,
                                { color: dark ? '#F9FAFB' : '#172033' },
                            ]}
                        >
                            Dark Mode
                        </Text>

                        <Text
                            style={[
                                styles.description,
                                { color: dark ? '#D1D5DB' : '#64748B' },
                            ]}
                        >
                            Change the app appearance.
                        </Text>
                    </View>

                    <Switch
                        value={dark}
                        onValueChange={handleThemeChange}
                        disabled={!isLoaded}
                        accessibilityLabel="Toggle dark mode"
                    />
                </View>
            </View>

            <View
                style={[
                    styles.card,
                    { backgroundColor: dark ? '#1F2937' : '#FFFFFF' },
                ]}
            >
                <Text
                    style={[
                        styles.settingTitle,
                        { color: dark ? '#F9FAFB' : '#172033' },
                    ]}
                >
                    About this App
                </Text>

                <Text
                    style={[
                        styles.description,
                        { color: dark ? '#D1D5DB' : '#64748B' },
                    ]}
                >
                    Profile & Activity App
                </Text>

                <Text
                    style={[
                        styles.description,
                        { color: dark ? '#D1D5DB' : '#64748B' },
                    ]}
                >
                    Version 1.0.0
                </Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 14,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textArea: {
        flex: 1,
        paddingRight: 12,
    },
    settingTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
    },
});