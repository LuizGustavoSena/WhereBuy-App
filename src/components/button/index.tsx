import { Pressable, Text } from 'react-native';

type Props = {
    title: string;
    action: Function;
    className?: string;
}
export default function Button({ title, action, className }: Props) {
    return (
        <Pressable className={`bg-purple-300 p-3 rounded-lg ${className}`} onPress={() => action()}>
            <Text className='text-lg'>{title}</Text>
        </Pressable>
    );
}