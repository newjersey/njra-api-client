import { Response } from 'got';
declare type Method = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'options' | 'trace' | undefined;
export declare function request(method: Method, uri: string, json?: Record<string, unknown>): Promise<Response>;
export {};
