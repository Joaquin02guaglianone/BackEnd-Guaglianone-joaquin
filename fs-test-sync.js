// const fs = require("fs")

// const contenido = fs.readFileSync("./test.txt", "utf8")

// console.log(contenido)


const fs = require('fs')

const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();

fs.writeFile('./fyh.txt',`Fecha: ${fecha} ... Hora: ${hora}`,(error)=>{
    if(error) return console.log(error);
    fs.readFile('./fyh.txt','utf-8',(error,result)=>{
        if(error) return console.log(error);
        console.log(result);
    })
})

