import Button from "@src/components/button";
import { Image, Text, View } from "react-native";
import Modal from 'react-native-modal';

type ModalErrorProps = {
    show: boolean;
    message: string;
    action(): void;
}
export default function ModalSuccess({ show, message, action }: ModalErrorProps) {
    return (
        <Modal isVisible={show}>
            <View className="flex justify-center items-center">
                <View className="flex justify-evenly items-center bg-white rounded-lg items-center w-[300px] h-[250px] border-t-[7px] border-purple-300 p-4">
                    <Image source={require('../../../../assets/success-icon.png')} />
                    <Text className="text-lg font-bold">Açao concluída com sucesso!</Text>
                    <Text className="text-center">{message}</Text>
                    <Button title="Ok" action={() => action()} />
                </View>
            </View>
        </Modal>
    )
}