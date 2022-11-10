// import parseArgs from "minimist";
// import * as dotenv from "dotenv";
const parseArgs = require("minimist");
const dotenv = require("dotenv");

// import Yargs from "yargs";
// console.log(Yargs(process.argv.slice(2)).argv);

dotenv.config();

const args = parseArgs(process.argv.slice(2));

const PORT = args.PORT || process.env.PORT || 8080;
const MONGOPSW = process.env.MONGOATLAS;
// console.log(args);

let MODO;
if (args["_"].includes("CLUSTER")) {
  MODO = "CLUSTER";
} else {
  MODO = "FORK";
}

module.exports = { PORT, MONGOPSW, MODO };
