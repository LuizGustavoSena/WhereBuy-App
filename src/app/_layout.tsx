import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function Index() {
    return (
        <View className="w-10 h-10 bg-red-500">
            <Text>Hello World Index!</Text>
            <StatusBar style="auto" />
        </View>
    );
}