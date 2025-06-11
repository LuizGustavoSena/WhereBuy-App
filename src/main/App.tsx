import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
    return (
        <View className="flex items-center justify-center">
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
        </View>
    );
}