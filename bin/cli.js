#!/usr/bin/env node
const { parse } = require("../dist")
const [,, ...args] = process.argv
const [input, output] = args
const { name, version } = require("../package.json")

if (args.includes("--version") || args.includes("-v")) {
  console.log(`${name} v${version}`)
  process.exit(0)
}

if (!input || !output) {
  console.error("Usage: openapi-typescript-parser <input> <output>")
  process.exit(1)
}

console.log(`Parsing ${input} to ${output}`)
parse({ openapi: input, outputFilePath: output })
  .then(() => console.log(`Generated ${output}`))
  .catch(console.error)