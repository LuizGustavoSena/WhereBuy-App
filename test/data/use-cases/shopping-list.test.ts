import { describe } from "vitest";
import { HttpClientSpy } from "../mocks/mock-http";
import { ShoppingListService } from "./shopping-list";

type Props = {
    httpClient: HttpClientSpy;
    sut: ShoppingListService
}

const makeSut = (): Props => {
    const httpClient = new HttpClientSpy();
    const sut = new ShoppingListService(httpClient);

    return {
        sut,
        httpClient
    }
}

describe('ShoppingListService', () => {

});