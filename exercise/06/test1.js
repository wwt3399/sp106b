var file = process.argv[2]
var fs = require('fs')
var asmText = fs.readFileSync(file,"utf8");
console.log(asmText);