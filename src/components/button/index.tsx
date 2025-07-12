import { Pressable, Text } from 'react-native';

type Props = {
    title: string;
    action: Function;
    className?: string;
    disable?: boolean
}
export default function Button({ title, action, className, disable }: Props) {
    return (
        <Pressable className={`${disable ? 'bg-gray-300' : 'bg-purple-300'} p-3 rounded-lg ${className}`} onPress={() => action()} disabled={disable}>
            <Text className='text-lg'>{title}</Text>
        </Pressable>
    );
}