/// <reference types="vitest" />
// @vitest-environment jsdom
import { faker } from "@faker-js/faker";
import { LocalStorageCacheClient } from "@src/infrastructure/cache/local-storage-cache-client";
import { beforeEach, describe, expect, it } from "vitest";
import { mockRequest } from "../mocks/mock-axios";

const makeSut = () => new LocalStorageCacheClient();

describe('LocalStorageCacheClient', () => {
    beforeEach(() => localStorage.clear());

    it('Should be successful create and read item in local storage', () => {
        const sut = makeSut();

        const request = mockRequest();
        const keyName = faker.string.sample();

        sut.create({ key: keyName, value: request });

        const response = sut.readByKey(keyName);

        expect(response).toEqual(request);
    });

    it('Should be null when read a undefined key', () => {
        const sut = makeSut();

        const response = sut.readByKey(faker.string.sample());

        expect(response).toBeNull();
    });
});