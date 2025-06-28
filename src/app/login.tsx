import Button from '@src/components/button';
import Input from '@src/components/input';
import ModalError from '@src/components/modals/modal-error';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { InvalidCredentialsError } from '@src/domain/errors/invalid-credentials';
import { makeAuth } from '@src/main/fatories/auth-factory';
import { makeAuthValidation } from '@src/main/fatories/auth-validation';
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import React, { useState } from 'react';
import { Pressable, Text, View } from "react-native";

const cacheUseCase = makeLocalStorageCacheClient();
const authUseCase = makeAuth();
const authValidation = makeAuthValidation();

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
            authValidation.signin({
                email,
                password: pass
            });

            const response = await authUseCase.signin({
                email,
                password: pass
            });

            cacheUseCase.create({
                key: CacheEnum.AUTH_CACHE,
                value: response.token
            });
        } catch (error) {
            var messageError = 'Erro ao efetuar login';

            if (error instanceof InvalidCredentialsError)
                messageError = error.message;

            setMessageError(messageError);
        }
    }

    return (
        <View className='flex justify-center items-center'>
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <View className="w-full bg-purple-300 h-[300px]">
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