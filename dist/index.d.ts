import type { OpenAPIV3_1 } from "openapi-types";
export declare type Options = {
    openapi: OpenAPIV3_1.Document | string;
    bannerComment?: string;
    outputFilePath?: string;
};
export declare function parse({ openapi, outputFilePath, bannerComment }: Options): Promise<{
    data: string;
    exports: Set<string>;
}>;
