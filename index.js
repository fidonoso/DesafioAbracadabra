const express = require('express')
const fs=require('fs')
const app = express()


app.listen(3000, () => {
    console.log('El servidor está inicializado en el puerto 3000')
});

app.use(express.static("assets"));

app.use('/abracadabra/juego/:usuario', (req, res, next)=>{
    let usuario = req.params.usuario
    let usuarios = JSON.parse(fs.readFileSync(__dirname +'/db/usuarios.json', 'utf8'))
    let respuesta= usuarios.usuarios.includes(usuario)
    respuesta? next(): res.send(`No existe el usuario ${usuario}`)
});


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname+'/db/usuarios.json')
    });








app.get("*", (req, res) => {
    res.send("<h1>Esta página no extiste...</h1>")
});