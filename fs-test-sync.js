const fs = require("fs")

const contenido = fs.readFileSync("./test.txt", "utf8")

console.log(contenido)