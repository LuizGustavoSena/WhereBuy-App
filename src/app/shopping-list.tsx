import { zodResolver } from '@hookform/resolvers/zod';
import Button from "@src/components/button";
import Input from "@src/components/input";
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeShoppingListValidation } from "@src/main/fatories/shopping-list-validation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

const shoppingListValidation = makeShoppingListValidation();

export default function ShoppingList() {
    const [addItem, setAddItem] = useState(false);

    const { control, handleSubmit, formState } = useForm<CreateValidation>({
        resolver: zodResolver(shoppingListValidation.createSchema),
        mode: 'onChange'
    });

    const closeAddItemModal = () => {
        setAddItem(false);
    }

    const submitItem = async () => {
        closeAddItemModal();
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
                                <Input className="w-[160px]" placeholder="Tipo de quantidade" value={field.value}
                                    action={field.onChange} errorMessage={fieldState.error?.message} />}
                            />
                        </View>
                        <View className="flex flex-row justify-between mt-5">
                            <Button className="bg-transparent" title="Cancelar" action={() => closeAddItemModal()} />
                            <Button title="Salvar" action={async () => { await handleSubmit(submitItem) }} disable={!formState.isValid} />
                        </View>
                    </View>
                </View>
            </Modal>
            <View className="flex flex-row justify-around items-center h-[100px]">
                <Pressable className="p-3 rounded-lg border-2 border-purple-300 w-[200px] flex items-center" onPress={() => { }}>
                    <Text>Gerar compras</Text>
                </Pressable>
                <Button className="w-[50px] flex items-center" title="+" action={() => setAddItem(true)} />
            </View>
        </>
    )
}