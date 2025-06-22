import Button from "@src/components/button";
import { Image, Text, View } from "react-native";
import Modal from 'react-native-modal';

type ModalErrorProps = {
    show: boolean;
    message: string;
    setModal(value: null): void;
}
export default function ModalError({ show, message, setModal }: ModalErrorProps) {
    return (
        <Modal isVisible={show}>
            <View className="flex justify-center items-center">
                <View className="flex justify-evenly items-center bg-white rounded-lg items-center w-[250px] h-[200px] border-t-[7px] border-purple-300">
                    <Image source={require('../../../../assets/error.png')} />
                    <Text>{message}</Text>
                    <Button title="Entendi" action={() => setModal(null)} />
                </View>
            </View>
        </Modal>
    )
}