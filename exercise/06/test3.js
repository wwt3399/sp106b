var file = process.argv[2]
var fs = require('fs')
var asmText = fs.readFileSync(file,"utf8");
var lines   = asmText.split(/\r?\n/);
for(var i=0;i<lines.length;i++){
    var p = parse(lines[i], i);
    if (p===null) continue;
}
console.log(JSON.stringify(lines, null, 2));