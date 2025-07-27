import { zodResolver } from '@hookform/resolvers/zod';
import Button from "@src/components/button";
import ButtonIcon from '@src/components/button-icon';
import Input from "@src/components/input";
import Loading from '@src/components/loading';
import ModalError from '@src/components/modals/modal-error';
import { CustomPicker } from '@src/components/picker';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { GetAllShoppingListResult, TypeAmountEnum, TypeAmountView } from '@src/domain/models/shopping-list';
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import { makeShoppingList } from '@src/main/fatories/shopping-list-factory';
import { makeShoppingListValidation } from "@src/main/fatories/shopping-list-validation";
import moment from 'moment';
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

                // const response = await shoppingListUseCase.getAll();
                const response: GetAllShoppingListResult = [
                    {
                        amount: 5,
                        created: moment().toDate(),
                        id: '1',
                        name: 'Banana nanica',
                        typeAmount: TypeAmountEnum.UNIT
                    },
                    {
                        amount: 150,
                        created: moment().toDate(),
                        id: '2',
                        name: 'Mussarela',
                        typeAmount: TypeAmountEnum.GRAMS
                    },
                    {
                        amount: 3,
                        created: moment().toDate(),
                        id: '3',
                        name: 'Leite desnatado',
                        typeAmount: TypeAmountEnum.LITERS
                    }
                ]

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
            <View className="flex flex-row justify-around items-center h-[80px] bg-gray-200">
                <Pressable className="p-3 rounded-lg border-2 border-gray-400 w-[200px] flex items-center" onPress={() => { }}>
                    <Text>Gerar compras</Text>
                </Pressable>
                <Button className="w-[50px] flex items-center" title="+" action={() => setAddItem(true)} />
            </View>
            {shoppingListItems.length > 0 ? (
                <View className='flex items-center'>
                    {shoppingListItems.map((el, i) => (
                        <View
                            key={el.id}
                            className={`flex flex-row items-center p-5 w-full h-[60px]`}
                        >
                            <View className='flex flex-row justify-between items-end w-[70%]'>
                                <Text className='text-[20px]'>{el.name}</Text>
                                <Text className='text-[16px]'>{el.amount} - {TypeAmountView[el.typeAmount]}</Text>
                            </View>
                            <View className='flex flex-row w-[30%] justify-around items-end'>
                                <ButtonIcon src={require('../../assets/edit-icon.png')} action={() => { }} />
                                <ButtonIcon src={require('../../assets/delete-icon.png')} action={() => { }} />
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <View className='flex items-center justify-end h-[200px]'>
                    <Text className='font-bold text-[24px]'>Nenhum item encontrado</Text>
                    <Text className='mt-[15px]'>Do que precisa? Adicione em sua lista!</Text>
                </View>
            )}
            <Loading show={loading} />
        </>
    )
}