import { CreateCacheProps, ICacheClient } from "@src/data/protocols/cache/cache-client";

export class CacheClientSpy implements ICacheClient {
    params: Partial<CreateCacheProps> = {};
    response: any;

    create(params: CreateCacheProps): void {
        this.params = params
    }

    readByKey(key: string): any | null {
        this.params = { key };

        return this.response;
    }

    deleteByKey(key: string): void {
        this.params = { key };
    }
}