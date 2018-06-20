var file = process.argv[2]
var fs = require('fs')
var asmText = fs.readFileSync(file,"utf8");
var lines   = asmText.split(/\r?\n/);
function intToStr(num, size, radix) {
  var s = num.toString(radix)+"";
  while (s.length < size) s = "0" + s;
  return s;
}
var symTable = {
  "R0"  :0,
  "R1"  :1,
  "R2"  :2,
  "R3"  :3,
  "R4"  :4,
  "R5"  :5,
  "R6"  :6,
  "R7"  :7,
  "R8"  :8,
  "R9"  :9,
  "R10" :10,
  "R11" :11,
  "R12" :12,
  "R13" :13,
  "R14" :14,
  "R15" :15,
  "SP"  :0,
  "LCL" :1,
  "ARG" :2,
  "THIS":3, 
  "THAT":4,
  "KBD" :24576,
  "SCREEN":16384
};

function parse(line, i) {
  line.match(/^([^\/]*)(\/.*)?$/);
  line = RegExp.$1.trim();
  if (line.length===0)
    return null;
  if (line.startsWith("@")) {
    return { type:"A", arg:line.substring(1).trim() }
  } else if (line.match(/^\(([^\)]+)\)$/)) {
    return { type:"S", symbol:RegExp.$1 }
  } else if (line.match(/^((([AMD]*)=)?([AMD01\+\-\&\|\!]*))(;(\w*))?$/)) {
    return { type:"C", c:RegExp.$4, d:RegExp.$3, j:RegExp.$6 }
  } else {
    throw "Error: line "+(i+1);
  }
}

function pass1(lines) {
  console.log("============== pass1 ================");
  var address = 0;
  for (var i=0; i<lines.length; i++) {
    var p = parse(lines[i], i);
    if (p===null) continue;
    if (p.type === "S") {
      console.log(" symbol: %s %s", p.symbol, intToStr(address, 4, 10));
      symTable[p.symbol] = address;
      continue;
    } else {
      console.log(" p: %j", p);
    }
    console.log("%s:%s %s", intToStr(i+1, 3, 10), intToStr(address, 4, 10),  lines[i]);
    address++;
  }
}
pass1(lines);