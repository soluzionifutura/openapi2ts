import { readFileSync, writeFileSync } from "fs"
import { compile } from "json-schema-to-typescript"
import type { OpenAPIV3 } from "openapi-types"

export type Options = { 
  openapi: OpenAPIV3.Document | string
  bannerComment?: string
  outputFilePath?: string
}

const _dig = (obj: any) => {
  for (const key in obj) {
    if (key === "$ref") {
      const ref = obj[key].split("/").pop()
      delete obj[key]
      obj.tsType = ref
    } else if (typeof obj[key] === "object") {
      _dig(obj[key])
    }
  }

  return obj
}

export async function parse({
  openapi,
  outputFilePath,
  bannerComment = `/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/**
 * This file was automatically generated by openapi2ts.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source
 * openapi definition and regenerate this file.
 */
`
}: Options): Promise<Set<string>> {
  if (typeof openapi === "string") {
    openapi = JSON.parse(readFileSync(openapi, "utf8")) as OpenAPIV3.Document
  }

  const exports = new Set<string>()

  const data = bannerComment + (await Promise.all(Object.entries(openapi.components!.schemas!).map(([name, schema]) => {
    if (exports.has(name)) {
      throw new Error(`Duplicate schema name: ${name}`)
    }

    exports.add(name)

    return compile(_dig(schema), name, {
      bannerComment: "",
      enableConstEnums: false,
      style: {
        semi: false
      }
    })
  }))).join("\n")

  if (outputFilePath) {
    writeFileSync(outputFilePath, data)
  }
  
  return exports
}