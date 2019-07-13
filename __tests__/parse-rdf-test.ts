import fs from "fs"

import parseRDF from "../lib/parser-rdf"
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`)

describe("parseRDF", () => {
  it("should be a function", () => {
    expect(parseRDF).toBeInstanceOf(Function)
  })

  it("should parse RDF content", () => {
    const book = parseRDF(rdf)
    expect(book).toBeInstanceOf(Object)
  })
})
