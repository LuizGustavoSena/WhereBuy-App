import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function Index() {
    return (
        <View>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
        </View>
    );
}