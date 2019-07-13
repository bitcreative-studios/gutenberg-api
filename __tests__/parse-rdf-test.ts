import fs from "fs"

import parseRDF from "../lib/parser-rdf"
import { ParsedContent } from "../lib/parser-rdf"

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`)

describe("parseRDF", () => {
  it("should be a function", () => {
    expect(parseRDF).toBeInstanceOf(Function)
  })

  it("should parse RDF content", () => {
    const parsedData: ParsedContent = {
      id: 132,
      title: "The Art of War",
      authors: ["Sunzi, active 6th century B.C.", "Giles, Lionel"],
      subjects: [
        "War -- Early works to 1800",
        "Military art and science -- Early works to 1800",
      ],
    }
    const book = parseRDF(rdf)
    expect(book).toEqual(parsedData)
  })
})
