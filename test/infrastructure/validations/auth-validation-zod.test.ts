import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from '@src/domain/errors/invalid-credentials';
import { AuthMessageType } from "@src/domain/validations/auth-validation";
import { AuthValidationZod } from "@src/infrastructure/validations/auth-validation-zod";
import { makeSigninRequest } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";

export const sut = new AuthValidationZod();

describe('AuthValidationZod', () => {
    it('Should be successfull login with correct params', () => {
        expect(sut.login(makeSigninRequest())).toBeUndefined();
    });

    it('Should be error login with incorrect email', () => {
        const request = {
            email: faker.number.int(),
            password: faker.string.sample()
        };
        // @ts-expect-error
        expect(() => sut.login(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error login with incorrect type email', () => {
        const request = {
            email: faker.string.sample(),
            password: faker.string.sample()
        };

        expect(() => sut.login(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error login with incorrect password', () => {
        const request = {
            email: faker.internet.email(),
            password: faker.number.int()
        };
        // @ts-expect-error
        expect(() => sut.login(request)).toThrow(new InvalidCredentialsError(AuthMessageType.PASSWORD));
    });
});