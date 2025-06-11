import { Stack } from 'expo-router';
import './global.css';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    );
}