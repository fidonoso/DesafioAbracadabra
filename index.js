const express = require('express')
const fs=require('fs')


const app = express()
app.listen(3000, () => {
    console.log('El servidor está escuchando en el puerto 3000')
});

app.use(express.static("assets"));

app.use('/abracadabra/juego/:usuario', (req, res, next)=>{
    let usuario = req.params.usuario
    let usuarios = JSON.parse(fs.readFileSync(__dirname +'/db/usuarios.json', 'utf8'))
    let respuesta= usuarios.usuarios.includes(usuario)
    respuesta? next(): res.sendFile(__dirname +'/assets/who.jpeg')
});

app.use('/abracadabra/conejo/:n', (req, res, next)=>{
    let n = Number(req.params.n)
    let nAzar= Math.floor(Math.random()*(4-1))+1
    console.log(n, nAzar)
    n==nAzar? next(): res.sendFile(__dirname +'/assets/voldemort.jpg')
});


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname+'/db/usuarios.json')
});

app.get('/abracadabra/juego/:usuario', (req, res, next)=>{
    res.send(`<h1>Usuario ${req.params.usuario} si existe en el servidor </h1>`)
});

app.get('/abracadabra/conejo/:n',(req, res)=>{
    res.sendFile(__dirname +'/assets/conejito.jpg')
})


app.get("*", (req, res) => {
    res.send("<h1>Esta página no extiste...</h1>")
});