import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Options() {
    const router = useRouter();

    return (
        <View className='w-full h-full'>
            <View className="flex flex-row w-full p-2 bg-gray-200">
                <Pressable className="flex flex-row" onPress={() => router.back()}>
                    <Image className="w-[30px] h-[30px] ml-[5px]" source={require('../../assets/left-arrow-icon.png')} />
                    <Text className="ml-3 text-[20px]">Voltar</Text>
                </Pressable>
            </View>
        </View>
    )
}