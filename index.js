const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const PORT = process.env.PORT || 5000
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(console.log("Connected to mongoDB")).catch((err)=> console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,"req.body.name")
    }
})

const upload = multer({storage:storage})

app.post('/server/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.use('/server/auth',authRoute)
app.use('/server/user',userRoute)
app.use("/server/posts", postRoute);
app.use("/server/categories", categoryRoute);

app.listen(PORT,() =>{
    console.log("Server listening at http://127.0.0.1:"+PORT)
})