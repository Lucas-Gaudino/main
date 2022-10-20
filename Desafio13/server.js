const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2));

console.log(args);
console.log(process.argv.slice(2));
