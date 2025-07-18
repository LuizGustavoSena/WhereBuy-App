import Button from '@src/components/button';
import Input from '@src/components/input';
import Loading from '@src/components/loading';
import ModalError from '@src/components/modals/modal-error';
import ModalSuccess from '@src/components/modals/modal-success';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { TabNavigation } from '@src/domain/enums/tab-navigation';
import { InvalidCredentialsError } from '@src/domain/errors/invalid-credentials';
import { makeAuth } from '@src/main/fatories/auth-factory';
import { makeAuthValidation } from '@src/main/fatories/auth-validation';
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import React, { useState } from 'react';
import { Keyboard, Pressable, Text, View } from "react-native";

const cacheUseCase = makeLocalStorageCacheClient();
const authUseCase = makeAuth();
const authValidation = makeAuthValidation();

export default function Login() {
    const [email, setEmail] = useState<string | null>();
    const [pass, setPass] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const [tab, setTab] = useState<TabNavigation>(TabNavigation.SIGNIN);
    const [messageError, setMessageError] = useState<string | null>();
    const [messageSuccess, setMessageSuccess] = useState<string | null>();
    const [loading, setLoading] = useState(false);

    const submitLogin = async () => {

        // router.replace('shopping-list');

        if (!email || !pass) {
            setMessageError('Preencha as informações solicitadas');

            return;
        }

        try {
            setLoading(true);

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
        } finally {
            setLoading(false);
        }
    }

    const submitSignUp = async () => {
        if (!email || !pass || !name) {
            setMessageError('Preencha as informações solicitadas');

            return;
        }

        try {
            setLoading(true);

            authValidation.signup({
                email,
                password: pass,
                name
            });

            await authUseCase.signup({
                email,
                password: pass,
                name
            });

            setMessageSuccess('Usuário cadastrado, agora faça o login')
        } catch (error) {
            var messageError = 'Erro ao efetuar cadastro';

            if (error instanceof InvalidCredentialsError)
                messageError = error.message;

            setMessageError(messageError);
        } finally {
            setLoading(false);
        }
    }

    const setTabNavigation = (tab: TabNavigation) => {
        Keyboard.dismiss();

        setName(null);
        setEmail(null);
        setPass(null);

        setTab(tab);
    }

    return (
        <View className='flex justify-center items-center'>
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <ModalSuccess show={!!messageSuccess} message={messageSuccess as string}
                action={() => { setMessageSuccess(null); setTabNavigation(TabNavigation.SIGNIN); }} />

            <View className="w-full bg-purple-300 h-[300px]">
            </View>

            <View className="w-full p-4 bg-white h-[600px] rounded-t-[50px] mt-[-45px]">
                {
                    tab === TabNavigation.SIGNIN ?
                        (
                            <>
                                <Text className='text-center text-2xl'>Bem vindo de volta</Text>

                                <View className='p-4'>
                                    <Input placeholder='Email' action={setEmail} value={email as string} />
                                    <Input placeholder='Senha' action={setPass} value={pass as string} secureTextEntry />

                                    <View className='flex flex-row justify-around m-5'>
                                        <Pressable className='justify-center' onPress={() => setTabNavigation(TabNavigation.SIGNUP)}>
                                            <Text className='text-lg color-blue-400'>Não possui cadastro?</Text>
                                        </Pressable>
                                        <Button title='Entrar' action={submitLogin} />
                                    </View>
                                </View>
                            </>
                        )
                        :
                        (
                            <>
                                <Text className='text-center text-2xl'>Cadastre seu usuário</Text>

                                <View className='p-4'>
                                    <Input placeholder='Nome' action={setName} value={name as string} />
                                    <Input placeholder='Email' action={setEmail} value={email as string} />
                                    <Input placeholder='Senha' action={setPass} value={pass as string} secureTextEntry />

                                    <View className='flex flex-row justify-around m-5'>
                                        <Pressable className='justify-center' onPress={() => setTabNavigation(TabNavigation.SIGNIN)}>
                                            <Text className='text-lg color-blue-400'>Já possuo cadastro!</Text>
                                        </Pressable>
                                        <Button title='Cadastrar' action={submitSignUp} />
                                    </View>
                                </View>
                            </>
                        )}
            </View>
            <Loading show={loading} />
        </View>
    );
}