import dir from "node-dir"
import { parseRDF } from "../lib/parser-rdf"

const dirname = process.argv[2]

// Match files with .rdf extensions
// Ignore the template RDF file (ID =0)
const options = {
  match: /\.rdf$/,
  exclude: ["pg0.rdf"],
}

process.stdout.on("error", err => {
  if (err.code === "EPIPE") {
    process.exit()
  }
  throw err
})

dir.readFiles(dirname, options, (err, content, next) => {
  if (err) throw err
  const doc = parseRDF(content)
  console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }))
  console.log(JSON.stringify(doc))
  next()
})
