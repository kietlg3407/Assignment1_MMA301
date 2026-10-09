
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';

export default function ScreenContainer({ title, children }) {
    const { theme } = useApp();
    const dark = theme === 'dark';

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: dark ? '#111827' : '#F4F6FB' },
            ]}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text
                    style={[
                        styles.title,
                        { color: dark ? '#F9FAFB' : '#172033' },
                    ]}
                >
                    {title}
                </Text>

                <View>{children}</View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 36,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});