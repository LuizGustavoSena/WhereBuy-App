import Button from "@src/components/button";
import Input from "@src/components/input";
import { TypeAmountEnum } from "@src/domain/models/shopping-list";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function ShoppingList() {
    const [addItem, setAddItem] = useState(false);
    const [itemName, setItemName] = useState<string | null>();
    const [itemAmount, setItemAmount] = useState<string | null>();
    const [itemTypeAmount, setItemTypeAmount] = useState<TypeAmountEnum | null>();

    useEffect(() => {

    }, [itemName, itemAmount, itemTypeAmount]);

    const closeAddItemModal = () => {
        setItemName(null);
        setItemAmount(null);
        setItemTypeAmount(null);
        setAddItem(false);
    }

    const submitItem = async () => {

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
                        <Input className="w-full" placeholder="Nome" value={itemName as string} action={(name) => { setItemName(name) }} />
                        <View className="flex flex-row justify-between w-full">
                            <Input className="w-[80px]" placeholder="Quant." value={itemAmount as string} action={(amount) => { setItemAmount(amount) }} />
                            <Input className="w-[160px]" placeholder="Tipo de quantidade" value={itemName as string} action={(name) => { setItemName(name) }} />
                        </View>
                        <View className="flex flex-row justify-between mt-5">
                            <Button className="bg-transparent" title="Cancelar" action={() => closeAddItemModal()} />
                            <Button title="Salvar" action={async () => {
                                await submitItem();
                                closeAddItemModal();
                            }} />
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