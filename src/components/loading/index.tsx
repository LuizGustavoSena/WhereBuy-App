import { ActivityIndicator, View } from "react-native";
import Modal from 'react-native-modal';

type Props = {
    show: boolean
}

export default function Loading({ show }: Props) {
    return (
        <>
            <Modal isVisible={show}>
                <View className="flex justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </>
    )
}