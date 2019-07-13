#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var parser_rdf_1 = require("../lib/parser-rdf");
var rdf = fs_1.default.readFileSync(process.argv[2]);
var book = parser_rdf_1.parseRDF(rdf);
console.log(JSON.stringify(book, null, 2));
