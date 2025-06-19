import { TextInput } from "react-native";

type Props = {
    placeholder: string;
    action(text: string): void;
    value?: string;
    className?: string;
    secureTextEntry?: boolean;
}

export default function Input({ placeholder, action, value, className, secureTextEntry }: Props) {
    return (
        <TextInput
            className={`border border-purple-800 rounded-md p-4 mt-5 ${className}`}
            onChangeText={(text) => action(text)}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    )
}