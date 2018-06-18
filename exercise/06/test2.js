var file = process.argv[2]
var fs = require('fs')
var asmText = fs.readFileSync(file,"utf8");
var lines   = asmText.split(/\r?\n/);
console.log(JSON.stringify(lines, null, 2))