import { TypeAmountEnum } from "@src/domain/models/shopping-list";
import { ShoppingListMessageRequire, ShoppingListMessageType } from "@src/domain/validations/shopping-list-validation";
import { z } from "zod";

export class ShoppingListValidationZod {
    private idSchema = z.string({
        required_error: ShoppingListMessageRequire.ID,
        invalid_type_error: ShoppingListMessageType.ID
    }).uuid({ message: ShoppingListMessageType.ID });

    private nameSchema = z.string({
        required_error: ShoppingListMessageRequire.NAME,
        invalid_type_error: ShoppingListMessageType.NAME
    });

    private amountSchema = z.number({
        required_error: ShoppingListMessageRequire.AMOUNT,
        invalid_type_error: ShoppingListMessageType.AMOUNT
    });

    private typeAmountSchema = z.nativeEnum(TypeAmountEnum, {
        required_error: ShoppingListMessageRequire.TYPE_AMOUNT,
        invalid_type_error: ShoppingListMessageType.TYPE_AMOUNT
    });

    createSchema = z.object({
        name: this.nameSchema,
        amount: this.amountSchema,
        typeAmount: this.typeAmountSchema
    });
}