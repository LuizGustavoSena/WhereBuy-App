import Button from "@src/components/button";
import { Modal, Text, View } from "react-native";

type ModalErrorProps = {
    show: boolean;
    message: string;
    setModal(value: string): void;
}
export default function ModalError({ show, message, setModal }: ModalErrorProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setModal('');
            }}>
            <View className="flex justify-center items-center">
                <View className="bg-white rounded-lg items-center" style={{ width: 250, height: 200 }}>
                    <Text>{message}</Text>
                    <Button title="Entendi" action={() => setModal('')} />
                </View>
            </View>
        </Modal>
    )
}