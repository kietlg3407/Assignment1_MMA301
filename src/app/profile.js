
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ScreenContainer from '../components/ScreenContainer';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
    const { profile, theme, isLoaded } = useApp();
    const dark = theme === 'dark';

    if (!isLoaded) {
        return (
            <ScreenContainer title="My Profile">
                <Text>Loading profile...</Text>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer title="My Profile">
            <View
                style={[
                    styles.card,
                    { backgroundColor: dark ? '#1F2937' : '#FFFFFF' },
                ]}
            >
                <Text style={styles.avatar}>👤</Text>

                <Text
                    style={[
                        styles.name,
                        { color: dark ? '#F9FAFB' : '#172033' },
                    ]}
                >
                    {profile.name}
                </Text>

                <Text style={styles.label}>Email</Text>
                <Text
                    style={[
                        styles.value,
                        { color: dark ? '#E5E7EB' : '#334155' },
                    ]}
                >
                    {profile.email}
                </Text>

                <Text style={styles.label}>Location</Text>
                <Text
                    style={[
                        styles.value,
                        { color: dark ? '#E5E7EB' : '#334155' },
                    ]}
                >
                    {profile.location}
                </Text>

                <Text style={styles.label}>About Me</Text>
                <Text
                    style={[
                        styles.value,
                        { color: dark ? '#E5E7EB' : '#334155' },
                    ]}
                >
                    {profile.bio || 'No bio provided.'}
                </Text>
            </View>

            <AppButton
                title="Edit Profile"
                onPress={() => router.push('/edit-profile')}
            />

            <AppButton
                title="Back to Home"
                variant="secondary"
                onPress={() => router.replace('/')}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 22,
        borderRadius: 16,
        marginBottom: 15,
    },
    avatar: {
        fontSize: 52,
        textAlign: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 22,
    },
    label: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        lineHeight: 23,
    },
});