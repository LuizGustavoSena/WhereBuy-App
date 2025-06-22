import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { SigninParams } from "@src/domain/models/auth";
import { IAuthValidation } from "@src/domain/validations/auth-validation";
import { z } from "zod";

export class AuthValidationZod implements IAuthValidation {
    constructor() { };

    login(props: SigninParams): void | Error {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(5)
        });

        const parse = schema.safeParse(props);

        if (!parse.success)
            throw new InvalidCredentialsError(JSON.stringify(parse.error.format()));
    }
}