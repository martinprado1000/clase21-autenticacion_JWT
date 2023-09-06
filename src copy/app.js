const express = require("express");
const app = express();
const { generateToken , verifyToken } = require("./utils/jwt.js")

app.use(express.json()); 
app.use(express.urlencoded({extended: false})) 
app.use(express.static("public"));

let user = [];

app.get("/",(req,res)=>{
  res.json({
    "status":"runing",
    "Date": new Date()
  })
})

app.post("/register",(req,res)=>{
  
  let user = user.find(user.email == req.body.email);
  if (user){
    return res.status(401).json({error:`El usuario ${req.body.email} ya existe`})
  }
  newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  user.push(newUser)

  const token = generateToken({ // Llamamos a nuestra funcion que genera el token
    name: req.body.name,
    email: req.body.email,
  })

  res.status(201).json({...newUser, access_token: token}) // Al arreglo del nuevo usuario le agrego la propiedad access_token y lo retornamos
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor express corriendo en el puerto ${PORT}`)); // Al server de express lo guardamos en una variable

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ "Error" : "La ruta deseada no existe" });
});