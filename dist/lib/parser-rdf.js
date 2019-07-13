"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
/**
 *
 * @param rdf
 */
exports.parseRDF = function (rdf) {
    var $ = cheerio_1.default.load(rdf);
    var book;
    /**
     * 1. Unary plus casts the result as a number
     * 2. Query for the <pgterms:ebook> tag (escaping both the backslash and colon)
     * 3. Get the value of the rdf:about attribute
     * 4. Strip off the leading 'ebooks/' substring
     */
    var id = +$("pgterms\\:ebook")
        .attr("rdf:about")
        .replace("ebooks/", "");
    var title = $("dcterms\\:title").text();
    var authors = $("pgterms\\:agent")
        .has("pgterms\\:name")
        .toArray()
        .map(function (elm) {
        var name = $(elm)
            .find("pgterms\\:name")
            .text();
        var alias = $(elm)
            .find("pgterms\\:alias")
            .toArray()
            .map(function (i) { return $(i).text(); });
        var wiki = $(elm)
            .find("[rdf\\:resource*='en.wiki']")
            .attr("rdf:resource");
        return { name: name, wiki: wiki, alias: alias };
    });
    var subjects = $("[rdf\\:resource$='/LCSH']")
        .parent()
        .find("rdf\\:value")
        .toArray()
        .map(function (elm) { return $(elm).text(); });
    var lcc = $("[rdf\\:resource$='/LCC']")
        .parent()
        .find("rdf\\:value")
        .text();
    var downloads = +$("pgterms\\:downloads").text();
    var sources = $("dcterms\\:hasFormat")
        .toArray()
        .map(function (elm) {
        var link = $(elm)
            .find("pgterms\\:file")
            .attr("rdf:about");
        var format = $(elm)
            .find("dcterms\\:format rdf\\:value")
            .text();
        return { format: format, link: link };
    })
        .filter(function (_a) {
        var link = _a.link;
        return /ebooks/.test(link) && !/rdf$/.test(link);
    });
    book = { id: id, title: title, authors: authors, subjects: subjects, lcc: lcc, downloads: downloads, sources: sources };
    return book;
};
