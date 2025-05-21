import { faker } from "@faker-js/faker";
import { SigninParams, SigninResponse } from "../models/auth";

export const makeSigninRequest = (params?: Partial<SigninParams>): SigninParams => ({
    email: params && params.email ? params.email : faker.internet.email(),
    password: params && params.password ? params.password : faker.internet.password()
});

export const makeSigninResponse = (params?: Partial<SigninResponse>): SigninResponse => ({
    token: params && params.token ? params.token : faker.internet.jwt()
});