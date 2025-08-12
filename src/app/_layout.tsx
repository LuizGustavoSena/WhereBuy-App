import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function Layout() {
    return (
        <SafeAreaView className='flex-1'>
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="shopping-list" options={{ headerShown: false }} />
                <Stack.Screen name="options" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}