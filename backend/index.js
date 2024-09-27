const path=require('path')
const express=require('express')
const dbConnection=require('./db')
const cors = require("cors")
const bodyParser = require('body-parser');

const app=express()

const PORT=5000

const _dirname = path.resolve();

app.use(bodyParser.json());
app.use(express.json())

dbConnection()

// app.get('/',(req,res)=>{
//     res.send("Its my first API")
// })

app.use(
    cors()
);

app.use('/api/slots',require('./route/SlotRoutes'));
app.use("/api/user",require('./route/userRoute'));
app.use("/api/authenticate",require('./route/routeUser'));
app.use("/api/product",require('./route/productRoute'));
// app.use("/api/blogpost",require('./route/BlogPostRoute'));
app.use('/api/blogs', require('./route/BlogRoutes'));
app.use('/api/booking', require('./route/Bookingroute'));
app.use('/api/treatment', require('./route/TreatmentRoute'));
// app.use('/api/form', require('./route/formRoute'));

// Progress Routes
// app.use('/api', require('./route/ProgressRoute'));

app.use('/api/admin', require('./route/adminroute'));

app.use('/api/form',require('./route/ContactRoute'));


app.use("/api/image",express.static('upload/'));


app.use(express.static(path.join(_dirname,"/frontend/build")));
app.get('*',(req, res) =>{
    res.sendFile(path.resolve(_dirname,"frontend","build","index.html"));
})

app.listen(PORT,()=>{
    console.log(`Server is listening on Port : ${PORT}`)
})