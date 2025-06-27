import { AuthValidationZod } from "@src/infrastructure/validations/auth-validation-zod";

export const makeAuthValidation = (): AuthValidationZod => new AuthValidationZod();