var file = process.argv[2]
var fs = require('fs')
var asmText = fs.readFileSync(file,"utf8");
var lines   = asmText.split(/\r?\n/);
function intToStr(num, size, radix) {
  var s = num.toString(radix)+"";
  while (s.length < size) s = "0" + s;
  return s;
}
for (var i=0; i<lines.length; i++){
console.log("%s:%s",intToStr(i+1, 3, 10),JSON.stringify(lines, null, 2));
}