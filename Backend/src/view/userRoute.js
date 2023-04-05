const express=require("express")
const app=express.Router()
const { signUp, logIn,getUser } = require("../controller/userController")

app.post("/signup",signUp)

app.post("/login",logIn)
app.get("/",getUser)



module.exports =app


