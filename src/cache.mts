interface ICacheEntry {
    pData: Promise<unknown>;
    nExpiresAt: number;
}

const mapCache = new Map<string, ICacheEntry>();
const nDefaultTtlMs = 5 * 60 * 1000; // 5 minutes

export function fnGetCached<T>(
    strKey: string,
    fnLoader: () => PromiseLike<T> | T,
    nTtlMs: number = nDefaultTtlMs
): Promise<T> {
    const nNow = Date.now();
    const objEntry = mapCache.get(strKey);

    if (objEntry && objEntry.nExpiresAt > nNow) {
        return objEntry.pData as Promise<T>;
    }

    const pData: Promise<T> = Promise.resolve().then(fnLoader);
    mapCache.set(strKey, { pData, nExpiresAt: nNow + nTtlMs });

    pData.catch(() => mapCache.delete(strKey));

    return pData;
}

export function fnInvalidateCache(strKey: string): void {
    mapCache.delete(strKey);
}