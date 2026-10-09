
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  AppProvider,
  useApp,
} from '../context/AppContext';

function AppNavigator() {
  const { theme } = useApp();

  return (
    <>
      <StatusBar
        style={theme === 'dark' ? 'light' : 'dark'}
      />

      <Stack
        initialRouteName="index"
        screenOptions={{
          headerStyle: {
            backgroundColor:
              theme === 'dark' ? '#1F2937' : '#FFFFFF',
          },
          headerTintColor:
            theme === 'dark' ? '#FFFFFF' : '#172033',
          contentStyle: {
            backgroundColor:
              theme === 'dark' ? '#111827' : '#F4F6FB',
          },
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="profile"
          options={{ title: 'My Profile' }}
        />

        <Stack.Screen
          name="edit-profile"
          options={{ title: 'Edit Profile' }}
        />

        <Stack.Screen
          name="activities"
          options={{ title: 'Activities' }}
        />

        <Stack.Screen
          name="settings"
          options={{ title: 'Settings' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}