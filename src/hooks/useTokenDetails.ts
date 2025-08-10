import { useEffect, useState } from "react";

export type TokenDataItem = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    vomumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24hr: string;
};

const ENDPOINT = "https://api.coincap.io/v2/assets/";
type ApiResponse = {
    data: TokenDataItem;
    timestamp: number;
};

export function useTokenDetails(id: string) {
    const [details, setDetails] = useState<ApiResponse|undefined>();
    const getData = async () => {
        try {
            const result = await fetch(ENDPOINT + id);
            const json = (await result.json()) as ApiResponse | undefined;
            if (!json) return;
            setDetails(json);
        } catch (e: unknown) {console.error(e)}
    };
    
    useEffect(() => {
        getData();
    }, [id]);

    return details;
}