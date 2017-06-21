export interface iError {
    code: string;
    message: string;
    status: number;
    statusText: string;
    params: {
        [s: string]: any;
    };
    url: string;
}
export declare const defaultError: (e: iError) => void;
export declare const axios_get: (endpoint: string, callback: (d: Object) => any, params: Object | undefined, error: (d: iError) => any) => any;
