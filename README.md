# openapi2ts

openapi2ts is a Node.js module that generates TypeScript interfaces from an OpenAPIv3 schema. It exports a `parse` function that takes an `Options` object as input and generates a `.ts` file containing TypeScript interfaces. The module also includes a CLI interface for parsing OpenAPI schema files and generating TypeScript interface files.

## Installation

To install openapi2ts, you need to have Node.js and npm installed on your machine. Then, run the following command:

```bash
npm i openapi2ts
```

## Usage

### Module interface

The module exports a single function `parse` which generates a TypeScript file from an OpenAPIv3 schema. The `parse` function takes an `Options` object as input and returns a Promise that resolves to the generated TypeScript file as a string. Here's an example of how to use the parse function:

```ts
import { parse, Options } from "openapi2ts";

const options: Options = {
  openapi: "path/to/openapi.json",
  outputFilePath: "path/to/output.ts",
  bannerComment: `/* My Banner Comment */`
};

parse(options)
  .then((data: string) => {
    console.log(data);
  })
  .catch((err: any) => {
    console.error(err);
  });
```

The `Options` object has the following properties:

- `openapi`: the path to the OpenAPIv3 schema file or the schema object itself. This property is required.
- `outputFilePath`: the path to the output TypeScript file. If this property is not provided, the generated TypeScript file will not be saved to disk.
- `bannerComment`: a banner comment that is added at the top of the generated TypeScript file. If this property is not provided, a default banner comment will be used.

### CLI Interface

The module also includes a CLI interface that can be used to parse an OpenAPI schema file and generate a TypeScript interface file. Here's an example of how to use the CLI:

```bash
openapi2ts path/to/openapi.json path/to/output.ts
```

## License

This module is released under the MIT License.
