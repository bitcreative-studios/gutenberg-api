import { ParsedContent } from "../lib/parser-rdf"

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeLCCCode(value: string): CustomMatcherResult
    }
  }
}
