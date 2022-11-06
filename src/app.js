const express = require("express");
const app = express();
const path = require("path");
const regData = require("./models/register");
const hbs = require("hbs");
require("./db/conn");

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);


app.get ("/index",(req,res)=>{
    res.render("index")
});
app.get ("/register",(req,res)=>{
    res.render("register")
});

app.post("/register",async(req,res)=>{
    try{
        const dataSave = new regData({
            uName : req.body.uName,
            email : req.body.email,
            password : req.body.password
        })
        const finalData = await dataSave.save();
        res.status(201).render("index");

    }catch(e){
        res.status(400).send(e);
    }
})

app.get ("/login",(req,res)=>{
    res.render("login")
});

app.post("/login",async(req,res)=>{
    try{
        const uName = req.body.uName;
        const password = req.body.password;

        const userName = await regData.findOne({uName:uName});

        if(userName.password === password){
            res.status(201).render("index");
        }else{
            res.send("something went wrong");
        }
        // res.send(userName.password);
        // console.log(`${uName} and password is ${password}`);

    }catch(error){
        // res.status(400).send(error);
        res.send("something went wrong");
    }
})

app.get ("/search",(req,res)=>{
    res.render("search")
});

app.listen(port,()=>{
    console.log(`server is rumming at port no ${port}`);
})