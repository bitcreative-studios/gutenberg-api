import fs from "fs"

import { parseRDF, ParsedContent } from "../lib/parser-rdf"

const artOfWarRDF = fs.readFileSync(`${__dirname}/pg132.rdf`)
const inSecretRDF = fs.readFileSync(`${__dirname}/pg5748.rdf`)

expect.extend({
  toBeLCCCode: (actual: string, expected: string) => {
    const isValid =
      actual === expected &&
      /^([A-HJ-NP-VZ])+$/g.test(actual) &&
      /^([A-HJ-NP-VZ])+$/g.test(expected)
    return {
      message: () => `expected that ${actual} was a valid LCC Code`,
      pass: isValid,
    }
  },
})

describe("parseRDF", () => {
  it("should be a function", () => {
    expect(parseRDF).toBeInstanceOf(Function)
  })

  it("should parse RDF content", () => {
    const artOfWarData = {
      id: 132,
      downloads: 3159,
      title: "The Art of War",
      authors: [
        {
          name: "Sunzi, active 6th century B.C.",
          wiki: "http://en.wikipedia.org/wiki/Sun_Tzu",
        },
        {
          name: "Giles, Lionel",
          wiki: "http://en.wikipedia.org/wiki/Lionel_Giles",
        },
      ],
      subjects: [
        "War -- Early works to 1800",
        "Military art and science -- Early works to 1800",
      ],
    }

    const inSecretData = {
      id: 5748,
      downloads: 26,
      title: "In Secret",
      authors: [
        {
          name: "Chambers, Robert W. (Robert William)",
          wiki: "http://en.wikipedia.org/wiki/Robert_W._Chambers",
        },
      ],
      subjects: ["World War, 1914-1918 -- Fiction"],
    }
    let book = parseRDF(artOfWarRDF)
    let lcc = book.lcc
    expect(book).toMatchObject(artOfWarData)
    // @ts-ignore
    expect(lcc).toBeLCCCode("U")
    book = parseRDF(inSecretRDF)
    lcc = book.lcc
    expect(book).toMatchObject(inSecretData)
    // @ts-ignore
    expect(lcc).toBeLCCCode("PS")
  })
})
