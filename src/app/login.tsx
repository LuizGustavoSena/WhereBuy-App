import Input from '@src/components/input';
import React, { useState } from 'react';
import { Text, View } from "react-native";

export default function Login() {
    const [email, setEmail] = useState<string | null>();
    const [pass, setPass] = useState<string | null>();

    return (
        <>
            <View className="w-full bg-blue-500" style={{ flex: 1 }}>
            </View>

            <View className="w-full p-4" style={{ flex: 2 }}>
                <Text className='text-center text-2xl'>Bem vindo de volta</Text>

                <View className='p-4'>
                    <Input placeholder='Email' action={(text) => setEmail(text)} />
                    <Input placeholder='Senha' action={(text) => setPass(text)} secureTextEntry />
                </View>
            </View>
        </>
    );
}