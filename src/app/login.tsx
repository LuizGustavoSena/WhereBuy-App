import Input from '@src/components/input';
import React from 'react';
import { Text, View } from "react-native";

export default function Login() {
    return (
        <>
            <View className="w-full bg-blue-500" style={{ flex: 1 }}>
            </View>

            <View className="w-full p-4" style={{ flex: 2 }}>
                <Text className='text-center text-2xl'>Bem vindo de volta</Text>

                <View className='p-4'>
                    <Input placeholder='Email' action={() => { }} />
                    <Input placeholder='Senha' action={() => { }} secureTextEntry />
                </View>
            </View>
        </>
    );
}