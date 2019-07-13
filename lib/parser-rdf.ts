import cheerio from "cheerio"

// TODO: store wiki page links for the authors

export type ParsedContent = {
  id: number
  title: string
  authors: Array<{ name: string; wiki?: string; alias: string[] }>
  subjects: string[]
  lcc: string
  sources?: Array<{ format: string; link: string }> | any
  downloads: number
}

/**
 *
 * @param rdf
 */
export const parseRDF = (rdf: Buffer | string): ParsedContent => {
  const $ = cheerio.load(rdf)
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

  const authors = $("pgterms\\:agent")
    .has("pgterms\\:name")
    .toArray()
    .map(elm => {
      const name = $(elm)
        .find("pgterms\\:name")
        .text()
      const alias = $(elm)
        .find("pgterms\\:alias")
        .toArray()
        .map(i => $(i).text())
      const wiki = $(elm)
        .find("[rdf\\:resource*='en.wiki']")
        .attr("rdf:resource")
      return { name, wiki, alias }
    })

  const subjects = $("[rdf\\:resource$='/LCSH']")
    .parent()
    .find("rdf\\:value")
    .toArray()
    .map(elm => $(elm).text())

  const lcc = $("[rdf\\:resource$='/LCC']")
    .parent()
    .find("rdf\\:value")
    .text()

  const downloads = +$("pgterms\\:downloads").text()

  const sources = $("dcterms\\:hasFormat")
    .toArray()
    .map(elm => {
      const link = $(elm)
        .find("pgterms\\:file")
        .attr("rdf:about")
      const format = $(elm)
        .find("dcterms\\:format rdf\\:value")
        .text()
      return { format, link }
    })
    .filter(({ link }) => /ebooks/.test(link) && !/rdf$/.test(link))
  book = { id, title, authors, subjects, lcc, downloads, sources }
  return book
}
