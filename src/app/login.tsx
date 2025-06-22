import Button from '@src/components/button';
import Input from '@src/components/input';
import ModalError from '@src/components/modals/modal-error';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { makeAuth } from '@src/main/fatories/auth-factory';
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import React, { useState } from 'react';
import { Pressable, Text, View } from "react-native";

const cacheUseCase = makeLocalStorageCacheClient();
const authUseCase = makeAuth();

export default function Login() {
    const [email, setEmail] = useState<string | null>();
    const [pass, setPass] = useState<string | null>();
    const [messageError, setMessageError] = useState<string | null>();

    const submitLogin = async () => {
        if (!email || !pass) {
            setMessageError('Preencha as informações solicitadas');

            return;
        }

        try {
            const response = await authUseCase.signin({
                email,
                password: pass
            });

            cacheUseCase.create({
                key: CacheEnum.AUTH_CACHE,
                value: response.token
            });
        } catch (error) {
            setMessageError('Erro ao efetuar login');
        }
    }

    return (
        <View className='flex justify-center items-center'>
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <View className="w-full bg-blue-500" style={{ height: 250 }}>
            </View>

            <View className="w-full p-4 bg-white h-[600px] rounded-t-[50px] mt-[-45px]">
                <Text className='text-center text-2xl'>Bem vindo de volta</Text>

                <View className='p-4'>
                    <Input placeholder='Email' action={setEmail} />
                    <Input placeholder='Senha' action={setPass} secureTextEntry />

                    <View className='flex flex-row justify-around m-5'>
                        <Pressable className='justify-center' onPress={() => { }}>
                            <Text className='text-lg color-blue-400'>Não possui cadastro?</Text>
                        </Pressable>
                        <Button title='Entrar' action={submitLogin} />
                    </View>
                </View>
            </View>
        </View>
    );
}