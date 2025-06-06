import { LocalStorageCacheClient } from "@src/infrastructure/cache/local-storage-cache-client";

export const makeLocalStorageCacheClient = (): LocalStorageCacheClient => new LocalStorageCacheClient();