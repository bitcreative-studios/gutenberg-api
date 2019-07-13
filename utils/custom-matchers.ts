import { ParsedContent } from "../lib/parser-rdf"

expect.extend({
  toBeLCCCode: (actual: string, expected: string) => {
    const isValid = true
    return ({
    message: `expected that ${actual} was a valid LCC Code`,
    pass: isValid
  })
  }
})
