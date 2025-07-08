import { Text, TextInput } from "react-native";

type Props = {
    placeholder: string;
    action(text: string): void;
    value?: string;
    className?: string;
    secureTextEntry?: boolean;
    errorMessage?: string;
}

export default function Input({ placeholder, action, value, className, secureTextEntry, errorMessage }: Props) {
    return (
        <>
            <TextInput
                className={`border border-purple-800 rounded-md p-4 mt-5 ${className} ${errorMessage && 'border-red-400'}`}
                onChangeText={(text) => action(text)}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
            <Text>{errorMessage}</Text>
        </>
    )
}