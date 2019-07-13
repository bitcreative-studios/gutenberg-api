"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_dir_1 = __importDefault(require("node-dir"));
var parser_rdf_1 = require("../lib/parser-rdf");
var dirname = process.argv[2];
// Match files with .rdf extensions
// Ignore the template RDF file (ID =0)
var options = {
    match: /\.rdf$/,
    exclude: ["pg0.rdf"],
};
process.stdout.on("error", function (err) {
    if (err.code === "EPIPE") {
        process.exit();
    }
    throw err;
});
node_dir_1.default.readFiles(dirname, options, function (err, content, next) {
    if (err)
        throw err;
    var doc = parser_rdf_1.parseRDF(content);
    console.log(JSON.stringify({ index: { _id: "pg" + doc.id } }));
    console.log(JSON.stringify(doc));
    next();
});
