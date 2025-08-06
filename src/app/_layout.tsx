import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function Layout() {
    return (
        <SafeAreaView className='flex-1'>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer>
                    <Drawer.Screen
                        name="options"
                        options={{
                            drawerLabel: 'Configurações',
                            title: 'Configurações',
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}