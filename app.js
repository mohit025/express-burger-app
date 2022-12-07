const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Burger=require('./model/burger')
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static("public"))
const url="mongodb://127.0.0.1:27017/Burgerapp"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err)
    console.log("Not connected");
    else
    console.log("Connected");
});

app.get('/' , (req,res)=>{
    Burger.find()
    .then((data)=>{
        res.render("index",{title:"Home", orders:data})
    })
    .catch((err)=>{
    console.log(err);})
})
app.get('/', (req,res)=>{
    res.render('index',{'title':'Home'})
})

app.get('/about', (req,res)=>{
   res.render('about',{'title':'About'})
})

app.get('/orders', (req,res)=>{
    res.render('order',{'title':'Order'})
})
app.post('/orders', (req,res)=>{
const burger=new Burger(req.body)
burger.save()
    .then(()=>{
        res.redirect('/')
        console.log("Successfully placed order");
    })
 .catch((err)=>{
    console.log("Error while ordering");
 })
})
app.use((req,res)=>{
    res.render('404',{'title':'404'})
})
app.listen(3000,()=>{
    console.log("Server running at port 3000");
})