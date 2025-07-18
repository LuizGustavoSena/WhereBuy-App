import { zodResolver } from '@hookform/resolvers/zod';
import Button from "@src/components/button";
import Input from "@src/components/input";
import Loading from '@src/components/loading';
import ModalError from '@src/components/modals/modal-error';
import { CustomPicker } from '@src/components/picker';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { GetAllShoppingListResult, TypeAmountEnum } from '@src/domain/models/shopping-list';
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import { makeShoppingList } from '@src/main/fatories/shopping-list-factory';
import { makeShoppingListValidation } from "@src/main/fatories/shopping-list-validation";
import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

const shoppingListValidation = makeShoppingListValidation();
const shoppingListUseCase = makeShoppingList();
const cacheUseCase = makeLocalStorageCacheClient();

export default function ShoppingList() {
    const [addItem, setAddItem] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState<string | null>();
    const [shoppingListItems, setShoppingListItems] = useState<GetAllShoppingListResult>([]);

    const { control, handleSubmit, formState, reset } = useForm<CreateValidation>({
        resolver: zodResolver(shoppingListValidation.createSchema),
        mode: 'onChange'
    });

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);

                const response = await shoppingListUseCase.getAll();

                setShoppingListItems(response);
            } catch (error: any) {
                setMessageError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getItems();
    }, []);

    const options = [
        { label: "Gramas", value: TypeAmountEnum.GRAMS },
        { label: "Litros", value: TypeAmountEnum.LITERS },
        { label: "Unidades", value: TypeAmountEnum.UNIT },
    ];

    const closeAddItemModal = () => {
        reset();
        setAddItem(false);
    }

    const submitItem = async (params: CreateValidation) => {
        try {
            setLoading(true);

            const response = await shoppingListUseCase.create({
                ...params,
                userId: cacheUseCase.readByKey(CacheEnum.AUTH_CACHE)
            });
        } catch (error: any) {
            setMessageError(error.message);
        } finally {
            closeAddItemModal();
            setLoading(false);
        }
    }

    return (
        <>
            <Modal isVisible={addItem}>
                <View className="flex justify-center items-center">
                    <View className="flex justify-evenly items-end bg-white rounded-lg w-[300px] h-[250px] border-t-[7px] border-purple-300 p-4">
                        <View className="flex flex-row w-full justify-between">
                            <Text className="text-lg font-bold">Adicionar item!</Text>
                            <Pressable onPress={() => closeAddItemModal()}>
                                <Image source={require('../../assets/close-icon.png')} />
                            </Pressable>
                        </View>
                        <Controller control={control} name="name" render={({ field, fieldState }) =>
                            <Input className="w-full" placeholder="Nome" value={field.value}
                                action={field.onChange} errorMessage={fieldState.error?.message} />}
                        />
                        <View className="flex flex-row justify-between w-full">
                            <Controller control={control} name="amount" render={({ field, fieldState }) =>
                                <Input className="w-[80px]" placeholder="Quant" value={field.value}
                                    action={field.onChange} errorMessage={fieldState.error?.message} />}
                            />
                            <Controller control={control} name="typeAmount" render={({ field, fieldState }) =>
                                <CustomPicker
                                    className="w-[160px] rounded-md mt-5 border border-purple-800"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={options}
                                    placeholder="Tipo de quantidade"
                                />
                            }
                            />
                        </View>
                        <View className="flex flex-row justify-between mt-5">
                            <Button className="bg-transparent" title="Cancelar" action={() => closeAddItemModal()} />
                            <Button title="Salvar" action={handleSubmit(async (data) => await submitItem(data))} disable={!formState.isValid} />
                        </View>
                    </View>
                </View>
            </Modal>
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <View className="flex flex-row justify-around items-center h-[100px]">
                <Pressable className="p-3 rounded-lg border-2 border-purple-300 w-[200px] flex items-center" onPress={() => { }}>
                    <Text>Gerar compras</Text>
                </Pressable>
                <Button className="w-[50px] flex items-center" title="+" action={() => setAddItem(true)} />
            </View>
            <Loading show={loading} />
        </>
    )
}