import { TypeAmountEnum } from "../models/shopping-list";

export enum ShoppingListMessageRequire {
    ID = 'O id deve ser preenchido',
    NAME = 'O nome deve ser preenchido',
    AMOUNT = 'A quantidade deve ser preenchido',
    TYPE_AMOUNT = 'O tipo de quantidade deve ser preenchido'
}

export const ShoppingListMessageType = {
    ID: 'Id deve ser do tipo guid',
    NAME: 'Nome deve ser do tipo string',
    AMOUNT: 'Quantidade deve ser do tipo number',
    TYPE_AMOUNT: `Tipo de quantidade não reconhecido, informe: ${Object.values(TypeAmountEnum).join(', ')}`
};

export type CreateValidation = {
    name: string;
    amount: number;
    typeAmount: TypeAmountEnum;
}