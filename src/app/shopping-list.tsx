import Button from "@src/components/button";
import { Pressable, Text, View } from "react-native";

export default function ShoppingList() {
    return (
        <>
            <View className="flex flex-row justify-around items-center h-[100px]">
                <Pressable className="p-3 rounded-lg border-2 border-purple-300 w-[200px] flex items-center" onPress={() => { }}>
                    <Text>Gerar compras</Text>
                </Pressable>
                <Button className="w-[50px] flex items-center" title="+" action={() => { }} />
            </View>
        </>
    )
}