import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from '@src/domain/errors/invalid-credentials';
import { AuthMessageType } from "@src/domain/validations/auth-validation";
import { AuthValidationZod } from "@src/infrastructure/validations/auth-validation-zod";
import { makeSigninRequest, makeSignupRequest } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";

export const sut = new AuthValidationZod();

describe('AuthValidationZod', () => {
    it('Should be successfull signin with correct params', () => {
        expect(sut.signin(makeSigninRequest())).toBeUndefined();
    });

    it('Should be error signin with incorrect email', () => {
        const request = {
            email: faker.number.int(),
            password: faker.string.sample()
        };
        // @ts-expect-error
        expect(() => sut.signin(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error signin with incorrect type email', () => {
        const request = {
            email: faker.string.sample(),
            password: faker.string.sample()
        };

        expect(() => sut.signin(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error signin with incorrect password', () => {
        const request = {
            email: faker.internet.email(),
            password: faker.number.int()
        };
        // @ts-expect-error
        expect(() => sut.signin(request)).toThrow(new InvalidCredentialsError(AuthMessageType.PASSWORD));
    });

    it('Should be successfull signup with correct params', () => {
        expect(sut.signup(makeSignupRequest())).toBeUndefined();
    });

    it('Should be error signup with incorrect email', () => {
        const request = {
            email: faker.number.int(),
            password: faker.string.sample(),
            name: faker.person.fullName()
        };
        // @ts-expect-error
        expect(() => sut.signup(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error signup with incorrect type email', () => {
        const request = {
            email: faker.string.sample(),
            password: faker.string.sample(),
            name: faker.person.fullName()
        };

        expect(() => sut.signup(request)).toThrow(new InvalidCredentialsError(AuthMessageType.EMAIL));
    });

    it('Should be error signup with incorrect password', () => {
        const request = {
            email: faker.internet.email(),
            password: faker.number.int(),
            name: faker.person.fullName()
        };
        // @ts-expect-error
        expect(() => sut.signup(request)).toThrow(new InvalidCredentialsError(AuthMessageType.PASSWORD));
    });
});