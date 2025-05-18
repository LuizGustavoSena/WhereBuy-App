import { faker } from '@faker-js/faker';
import { HttpRequest, HttpStatusCode } from '@src/data/protocols/http/http-client';
import axios from 'axios';

export const mockHttpResponse = (): any => ({
    data: faker.helpers.objectValue({ product: '', price: 0, quantity: 0 }),
    status: faker.helpers.enumValue(HttpStatusCode)
})

export const mockAxios = () => {
    const mockedAxios = axios as any;
    mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
    return mockedAxios
}

export const mockRequest = (): HttpRequest => ({
    method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
    url: faker.internet.url(),
    body: faker.helpers.objectValue({ product: '', price: 0, quantity: 0 }),
});