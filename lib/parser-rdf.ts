import cheerio from "cheerio"

export type ParsedContent = {
  id: number
  title: string
  authors: string[]
  subjects: string[]
}

const parseRDF = (content: Buffer): ParsedContent => {
  const $ = cheerio.load(content)
  let book: ParsedContent
  /**
   * 1. Unary plus casts the result as a number
   * 2. Query for the <pgterms:ebook> tag (escaping both the backslash and colon)
   * 3. Get the value of the rdf:about attribute
   * 4. Strip off the leading 'ebooks/' substring
   */
  const id = +$("pgterms\\:ebook")
    .attr("rdf:about")
    .replace("ebooks/", "")

  const title = $("dcterms\\:title").text()

  const authors = $("pgterms\\:agent pgterms\\:name")
    .toArray()
    .map(elm => $(elm).text())

  const subjects = $("[rdf\\:resource$='/LCSH']")
    .parent()
    .find("rdf\\:value")
    .toArray()
    .map(elm => $(elm).text())

  book = { id, title, authors, subjects }
  return book
}
export default parseRDF
