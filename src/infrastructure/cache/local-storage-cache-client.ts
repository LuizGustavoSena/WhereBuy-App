import { CreateCacheProps, ICacheClient } from "@src/data/protocols/cache/cache-client";

export class LocalStorageCacheClient implements ICacheClient {
    create({ key, value }: CreateCacheProps): void {
        const body = JSON.stringify(value);

        localStorage.setItem(key, body);
    }

    readByKey(key: string): any | null {
        const response = localStorage.getItem(key);

        if (!response)
            return null;

        return JSON.parse(response);
    }

    delete(): void {
        throw new Error("Method not implemented.");
    }
}