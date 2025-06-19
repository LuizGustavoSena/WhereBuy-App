import Button from '@src/components/button';
import Input from '@src/components/input';
import React, { useState } from 'react';
import { Pressable, Text, View } from "react-native";

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

                    <View className='flex flex-row justify-around m-5'>
                        <Pressable className='justify-center' onPress={() => { }}>
                            <Text className='text-lg color-blue-400'>Não possui cadastro?</Text>
                        </Pressable>
                        <Button title='Entrar' action={() => { }} />
                    </View>
                </View>
            </View>
        </>
    );
}