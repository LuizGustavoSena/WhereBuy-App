import { TextInput } from "react-native";

type Props = {
    placeholder: string;
    action(text: string | number): void;
    value?: string | number;
    className?: string;
    secureTextEntry?: boolean;
    errorMessage?: string;
}

export default function Input({ placeholder, action, value, className, secureTextEntry, errorMessage }: Props) {
    return (
        <>
            <TextInput
                className={`border border-purple-800 rounded-md p-4 mt-5 ${className} ${errorMessage && 'border-red-400'}`}
                onChangeText={(text: string | number) => action(isNaN(text as number) ? text : +text)}
                value={!!value ? `${value}` : ''}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </>
    )
}