export type CreateCacheProps = {
    key: string;
    value: any;
}

export interface ICacheClient {
    create(params: CreateCacheProps): void;
    readByKey(key: string): any;
    delete(): void;
}