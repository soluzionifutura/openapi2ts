#!/usr/bin/env node
const { parse } = require("../dist")
const axios = require("axios")
const [,, ...args] = process.argv
const [input, output] = args
const { name, version } = require("../package.json")

void (async () => {
  if (args.includes("--version") || args.includes("-v")) {
    console.log(`${name} v${version}`)
    process.exit(0)
  }

  if (!input || !output) {
    console.error("Usage: openapi2ts <input> <output>")
    process.exit(1)
  }

  let openapi
  if (input.startsWith("http")) {
    console.log(`Downloading api definition`)
    const { data } = await axios.get(input)
    openapi = data
  }
  
  console.log(`Parsing ${input} to ${output}`)
  await parse({ openapi: openapi || input, outputFilePath: output })
  console.log(`Generated ${output}`)
})().catch(console.error)