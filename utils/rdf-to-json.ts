#! /usr/bin/env node

import fs from "fs"
import { parseRDF } from "../lib/parser-rdf"

const rdf = fs.readFileSync(process.argv[2])
const book = parseRDF(rdf)

console.log(JSON.stringify(book, null, 2))
