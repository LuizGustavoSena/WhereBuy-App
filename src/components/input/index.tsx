import { TextInput } from "react-native";

type Props = {
    placeholder: string;
    action: Function;
    value?: string;
    className?: string;
    secureTextEntry?: boolean;
}

export default function Input({ placeholder, action, value, className, secureTextEntry }: Props) {
    return (
        <TextInput
            className={`border border-purple-800 rounded-md p-4 mt-5 ${className}`}
            onChangeText={() => action()}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    )
}