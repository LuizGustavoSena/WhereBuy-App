import { AuthValidationZod } from "@src/infrastructure/validations/auth-validation-zod";
import { makeSigninRequest } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";

export const sut = new AuthValidationZod();

describe('AuthValidationZod', () => {
    it('Should be successfull login with correct params', () => {
        expect(sut.login(makeSigninRequest())).toBeUndefined();
    });
});