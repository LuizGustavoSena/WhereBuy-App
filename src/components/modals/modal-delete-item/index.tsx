import Button from "@src/components/button";
import { Image, Text, View } from "react-native";
import Modal from 'react-native-modal';

type ModalErrorProps = {
    show: boolean;
    itemName: string;
    closeModal(): void;
    submit(): void;
}

export default function ModalDeleteItem({ show, itemName, closeModal, submit }: ModalErrorProps) {
    const handleCancel = () => {
        closeModal();
    }

    const handleSubmit = () => {
        handleCancel();
        submit();
    }

    return (
        <Modal isVisible={show}>
            <View className="flex justify-center items-center">
                <View className="flex justify-evenly items-end bg-white rounded-lg w-[300px] h-[250px] p-4">
                    <View className="flex items-center">
                        <Image className="mb-[5px]" source={require('../../../../assets/warning-icon.png')} />
                        <Text className="text-lg font-bold text-center mb-[5px]">Tem certeza que deseja remover esse item?!</Text>
                        <Text className="text-center">Ao confirmar solicitação será excluido permanentemente o item {itemName}</Text>
                    </View>
                    <View className="flex flex-row justify-between mt-3">
                        <Button className="bg-transparent" title="Cancelar" action={() => handleCancel()} />
                        <Button title="Deletar" action={handleSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}