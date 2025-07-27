import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Option = {
    label: string;
    value: string;
};

interface CustomPickerProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string
}

export function CustomPicker({
    options,
    value,
    onChange,
    placeholder = "Selecione...",
    className
}: CustomPickerProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedLabel =
        options.find((option) => option.value === value)?.label ?? placeholder;

    return (
        <View className={`rounded-md mt-5 border border-gray-500 ${className}`}>
            <Pressable
                onPress={() => setModalVisible(true)}
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white justify-center"
            >
                <Text className="text-gray-800 mt-[2px]">{selectedLabel}</Text>
            </Pressable>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="w-11/12 max-h-[60%] bg-white rounded-xl p-4">
                        <Text className="text-lg font-bold mb-4">Selecione uma opção</Text>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        onChange(item.value);
                                        setModalVisible(false);
                                    }}
                                    className="py-3 border-b border-gray-200"
                                >
                                    <Text
                                        className={`text-base ${value === item.value ? "text-blue-600 font-semibold" : ""
                                            }`}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}
