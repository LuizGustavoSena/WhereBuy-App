import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@src/components/button";
import Input from "@src/components/input";
import { CustomPicker } from "@src/components/picker";
import { TypeAmountEnum } from "@src/domain/models/shopping-list";
import { CreateValidation } from "@src/domain/validations/shopping-list-validation";
import { makeShoppingListValidation } from "@src/main/fatories/shopping-list-validation";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
    show: boolean;
    closeModal(): void;
    submit(params: CreateValidation): Promise<void>;
}

const shoppingListValidation = makeShoppingListValidation();

export default function ModalAddItem({ show, closeModal, submit }: Props) {
    const { control, handleSubmit, formState, reset } = useForm<CreateValidation>({
        resolver: zodResolver(shoppingListValidation.createSchema),
        mode: 'onChange'
    });

    const handleCancel = () => {
        reset();

        closeModal();
    }

    const handleSuccess = async (params: CreateValidation) => {
        handleCancel();

        await submit(params);
    }

    const options = [
        { label: "Gramas", value: TypeAmountEnum.GRAMS },
        { label: "Litros", value: TypeAmountEnum.LITERS },
        { label: "Unidades", value: TypeAmountEnum.UNIT },
    ];

    return (
        <Modal isVisible={show}>
            <View className="flex justify-center items-center">
                <View className="flex justify-evenly items-end bg-white rounded-lg w-[300px] h-[250px] p-4">
                    <View className="flex flex-row w-full justify-between">
                        <Text className="text-lg font-bold">Adicionar item!</Text>
                        <Pressable onPress={() => handleCancel()}>
                            <Image source={require('../../../../assets/close-icon.png')} />
                        </Pressable>
                    </View>
                    <Controller control={control} name="name" render={({ field, fieldState }) =>
                        <Input className="w-full" placeholder="Nome" value={field.value}
                            action={field.onChange} errorMessage={fieldState.error?.message} />}
                    />
                    <View className="flex flex-row justify-between w-full">
                        <Controller control={control} name="amount" render={({ field, fieldState }) =>
                            <Input className="w-[80px]" placeholder="Quant" value={field.value}
                                action={field.onChange} errorMessage={fieldState.error?.message} />}
                        />
                        <Controller control={control} name="typeAmount" render={({ field, fieldState }) =>
                            <CustomPicker
                                className="w-[160px]"
                                value={field.value}
                                onChange={field.onChange}
                                options={options}
                                placeholder="Tipo de quantidade"
                            />
                        }
                        />
                    </View>
                    <View className="flex flex-row justify-between mt-5">
                        <Button className="bg-transparent" title="Cancelar" action={() => handleCancel()} />
                        <Button title="Salvar" action={handleSubmit(async (data) => await handleSuccess(data))} disable={!formState.isValid} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}