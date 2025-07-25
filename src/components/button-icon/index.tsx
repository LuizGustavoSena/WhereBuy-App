import { Image, ImageSourcePropType, Pressable } from 'react-native';

type Props = {
    src: ImageSourcePropType;
    action: Function;
}

export default function ButtonIcon({ src, action }: Props) {
    return (
        <Pressable className={`bg-gray-300 p-3 rounded-lg`} onPress={() => action()}>
            <Image
                className='w-[20px] h-[20px]'
                source={src}
            />
        </Pressable>
    );
}