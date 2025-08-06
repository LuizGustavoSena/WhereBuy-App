import Button from "@src/components/button";
import ButtonIcon from '@src/components/button-icon';
import Loading from '@src/components/loading';
import ModalItem from '@src/components/modals/modal-add-item';
import ModalDeleteItem from "@src/components/modals/modal-delete-item";
import ModalError from '@src/components/modals/modal-error';
import { CacheEnum } from '@src/domain/enums/cache-enum';
import { GetAllShoppingListResult, TypeAmountEnum, TypeAmountView, UpdateShoppingListResult } from '@src/domain/models/shopping-list';
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeLocalStorageCacheClient } from '@src/main/fatories/local-storage-cache-client-factory';
import { makeShoppingList } from '@src/main/fatories/shopping-list-factory';
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

enum ModalItemEnum {
    ADD,
    EDIT,
    DELETE
}

const shoppingListUseCase = makeShoppingList();
const cacheUseCase = makeLocalStorageCacheClient();

export default function ShoppingList() {
    const [modal, setModal] = useState<ModalItemEnum | null>(null);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState<string | null>();
    const [shoppingListItems, setShoppingListItems] = useState<GetAllShoppingListResult>([]);
    const [item, setItem] = useState<UpdateShoppingListResult | undefined>();

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

    const editItemByItem = (item: UpdateShoppingListResult) => {
        setItem(item);
        setModal(ModalItemEnum.EDIT);
    }

    const deleteItemByItem = (item: UpdateShoppingListResult) => {
        setItem(item);
        setModal(ModalItemEnum.DELETE);
    }

    const editItem = async (params: CreateValidation) => {
        try {
            setLoading(true);

            const response = await shoppingListUseCase.update({
                id: item?.id ?? '',
                data: params
            });

            var oldItem = shoppingListItems.find(el => el.id === response.id);
            oldItem = { ...response };

            setShoppingListItems(shoppingListItems);
            setItem(undefined);
        } catch (error: any) {
            setMessageError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteItem = async () => {
        try {
            setLoading(true);

            await shoppingListUseCase.deleteById(item?.id ?? '');

            setShoppingListItems(shoppingListItems.filter(el => el.id !== item?.id));
            setItem(undefined);
        } catch (error: any) {
            setMessageError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Loading show={loading} />
            <ModalItem show={modal === ModalItemEnum.ADD} closeModal={() => setModal(null)} submit={submitItem} />
            <ModalItem show={modal === ModalItemEnum.EDIT} closeModal={() => setModal(null)} submit={editItem} values={item} />
            <ModalDeleteItem show={modal === ModalItemEnum.DELETE} itemName={item?.name || ''} closeModal={() => setModal(null)} submit={deleteItem} />
            <ModalError show={!!messageError} message={messageError as string} setModal={setMessageError} />
            <View className="w-full bg-gray-200 justify-between py-[5px] px-[25px] h-[120px]">
                <View className="flex flex-row items-center border border-gray-500 rounded-[20px] p">
                    <Image className="w-[20px] h-[20px] ml-[5px]" source={require('../../assets/search-icon.png')} />
                    <TextInput
                        className={` `}
                        onChangeText={(text: string) => { }}
                        placeholder="Busca"
                    />
                </View>
                <View className="flex flex-row justify-between items-center">
                    <Pressable className="p-3 rounded-lg border-2 border-gray-400 w-[200px] flex items-center" onPress={() => { }}>
                        <Text>Gerar compras</Text>
                    </Pressable>
                    <Button className="w-[50px] flex items-center" title="+" action={() => setModal(ModalItemEnum.ADD)} />
                </View>
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
                                <ButtonIcon src={require('../../assets/edit-icon.png')} action={() => editItemByItem(el)} />
                                <ButtonIcon src={require('../../assets/delete-icon.png')} action={() => deleteItemByItem(el)} />
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
        </>
    )
}