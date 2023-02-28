import type { OpenAPIV3 } from "openapi-types";
export declare type Options = {
    openapi: OpenAPIV3.Document | string;
    bannerComment?: string;
    outputFilePath?: string;
};
export declare function parse({ openapi, outputFilePath, bannerComment }: Options): Promise<Set<string>>;
