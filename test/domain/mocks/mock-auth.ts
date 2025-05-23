import { faker } from "@faker-js/faker";
import { SigninParams, SigninResponse, SignupParams } from "@src/domain/models/auth";

export const makeSigninRequest = (params?: Partial<SigninParams>): SigninParams => ({
    email: params && params.email ? params.email : faker.internet.email(),
    password: params && params.password ? params.password : faker.internet.password()
});

export const makeSignupRequest = (params?: Partial<SignupParams>): SignupParams => ({
    email: params && params.email ? params.email : faker.internet.email(),
    password: params && params.password ? params.password : faker.internet.password(),
    name: params && params.name ? params.name : faker.person.fullName(),
});

export const makeSigninResponse = (params?: Partial<SigninResponse>): SigninResponse => ({
    token: params && params.token ? params.token : faker.internet.jwt()
});