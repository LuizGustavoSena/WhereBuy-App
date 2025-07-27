import { zodResolver } from '@hookform/resolvers/zod';
import Button from "@src/components/button";
import ButtonIcon from '@src/components/button-icon';
import Loading from '@src/components/loading';
import ModalAddItem from '@src/components/modals/modal-add-item';
import ModalError from '@src/components/modals/modal-error';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { GetAllShoppingListResult, TypeAmountEnum, TypeAmountView } from '@src/domain/models/shopping-list';
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import { makeShoppingList } from '@src/main/fatories/shopping-list-factory';
import { makeShoppingListValidation } from "@src/main/fatories/shopping-list-validation";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from "react-native";

enum ModalItemEnum {
    ADD,
    EDIT,
    DELETE
}

const shoppingListValidation = makeShoppingListValidation();
const shoppingListUseCase = makeShoppingList();
const cacheUseCase = makeLocalStorageCacheClient();

export default function ShoppingList() {
    const [modal, setModal] = useState<ModalItemEnum | null>(null);
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
            setLoading(false);
        }
    }

    return (
        <>
            <ModalAddItem show={modal === ModalItemEnum.ADD} closeModal={() => setModal(null)} submit={submitItem} />
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <View className="flex flex-row justify-around items-center h-[80px] bg-gray-200">
                <Pressable className="p-3 rounded-lg border-2 border-gray-400 w-[200px] flex items-center" onPress={() => { }}>
                    <Text>Gerar compras</Text>
                </Pressable>
                <Button className="w-[50px] flex items-center" title="+" action={() => setModal(ModalItemEnum.ADD)} />
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