
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Text,
    TextInput,
    StyleSheet,
    View,
} from 'react-native';
import { router } from 'expo-router';

import ScreenContainer from '../components/ScreenContainer';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

export default function EditProfileScreen() {
    const { profile, updateProfile, theme, isLoaded } = useApp();
    const dark = theme === 'dark';

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [location, setLocation] = useState(profile.location);
    const [bio, setBio] = useState(profile.bio);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            setName(profile.name);
            setEmail(profile.email);
            setLocation(profile.location);
            setBio(profile.bio);
        }
    }, [isLoaded, profile]);

    const inputStyle = [
        styles.input,
        {
            color: dark ? '#F9FAFB' : '#172033',
            backgroundColor: dark ? '#1F2937' : '#FFFFFF',
            borderColor: dark ? '#4B5563' : '#CBD5E1',
        },
    ];

    async function handleSave() {
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanLocation = location.trim();
        const cleanBio = bio.trim();

        if (!cleanName) {
            Alert.alert('Validation Error', 'Name is required.');
            return;
        }

        if (cleanName.length > 50) {
            Alert.alert('Validation Error', 'Name must be 50 characters or less.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        if (cleanLocation.length > 100 || cleanBio.length > 200) {
            Alert.alert(
                'Validation Error',
                'Location must be at most 100 characters and bio at most 200.'
            );
            return;
        }

        setIsSaving(true);
        try {
            await updateProfile({
                name: cleanName,
                email: cleanEmail,
                location: cleanLocation,
                bio: cleanBio,
            });

            Alert.alert('Success', 'Your profile has been updated.', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/profile'),
                },
            ]);
        } catch (error) {
            console.error('Cannot update profile:', error);
            Alert.alert('Save Error', 'Your profile could not be saved. Please try again.');
        } finally {
            setIsSaving(false);
        }
    }

    if (!isLoaded) {
        return (
            <ScreenContainer title="Edit Profile">
                <Text>Loading profile...</Text>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer title="Edit Profile">
            <View style={styles.form}>
                <Text style={[styles.label, { color: dark ? '#E5E7EB' : '#334155' }]}>
                    Full Name *
                </Text>
                <TextInput
                    style={inputStyle}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={dark ? '#9CA3AF' : '#94A3B8'}
                    maxLength={50}
                />

                <Text style={[styles.label, { color: dark ? '#E5E7EB' : '#334155' }]}>
                    Email *
                </Text>
                <TextInput
                    style={inputStyle}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor={dark ? '#9CA3AF' : '#94A3B8'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    maxLength={100}
                />

                <Text style={[styles.label, { color: dark ? '#E5E7EB' : '#334155' }]}>
                    Location
                </Text>
                <TextInput
                    style={inputStyle}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter your location"
                    placeholderTextColor={dark ? '#9CA3AF' : '#94A3B8'}
                    maxLength={100}
                />

                <Text style={[styles.label, { color: dark ? '#E5E7EB' : '#334155' }]}>
                    About Me
                </Text>
                <TextInput
                    style={[inputStyle, styles.bioInput]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Write something about yourself"
                    placeholderTextColor={dark ? '#9CA3AF' : '#94A3B8'}
                    multiline
                    maxLength={200}
                    textAlignVertical="top"
                />

                <Text style={styles.counter}>{bio.length}/200 characters</Text>

                <AppButton
                    title={isSaving ? 'Saving...' : 'Save Changes'}
                    onPress={handleSave}
                    disabled={isSaving}
                />

                <AppButton
                    title="Cancel"
                    variant="secondary"
                    onPress={() => router.back()}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    form: {
        gap: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 3,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
    },
    bioInput: {
        minHeight: 110,
    },
    counter: {
        color: '#64748B',
        textAlign: 'right',
        fontSize: 12,
        marginBottom: 10,
    },
});