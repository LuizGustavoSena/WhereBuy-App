import { Pressable, Text } from 'react-native';

type Props = {
    title: string;
    action: Function;
}
export default function Button({ title, action }: Props) {
    return (
        <Pressable className='bg-purple-300 p-3 rounded-lg' onPress={() => action()}>
            <Text className='text-lg'>{title}</Text>
        </Pressable>
    );
}