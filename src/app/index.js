
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ScreenContainer from '../components/ScreenContainer';
import AppButton from '../components/AppButton';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { profile, theme, isLoaded } = useApp();
  const dark = theme === 'dark';

  if (!isLoaded) {
    return (
      <ScreenContainer title="Home">
        <Text>Loading your profile...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title="Welcome to My App!">
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? '#1F2937' : '#FFFFFF' },
        ]}
      >
        <Text style={styles.emoji}>👋</Text>

        <Text
          style={[
            styles.heading,
            { color: dark ? '#F9FAFB' : '#172033' },
          ]}
        >
          Hello, {profile.name}!
        </Text>

        <Text
          style={[
            styles.description,
            { color: dark ? '#D1D5DB' : '#64748B' },
          ]}
        >
          Manage your profile, track activities, and customize your app.
        </Text>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: dark ? '#F9FAFB' : '#172033' },
        ]}
      >
        Quick Menu
      </Text>

      <AppButton
        title="View Profile"
        onPress={() => router.push('/profile')}
      />

      <AppButton
        title="Edit Profile"
        onPress={() => router.push('/edit-profile')}
      />

      <AppButton
        title="View Activities"
        onPress={() => router.push('/activities')}
      />

      <AppButton
        title="Settings"
        onPress={() => router.push('/settings')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 16,
    marginBottom: 25,
    elevation: 2,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});