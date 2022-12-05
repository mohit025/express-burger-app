const express=require('express')
const app=express()

app.set('view engine','ejs')
app.use(express.static("public"))



app.get('/', (req,res)=>{
    res.render('index',{'title':'Home'})
})

app.get('/about', (req,res)=>{
   res.render('about',{'title':'About'})
})

app.get('/order', (req,res)=>{
    res.render('order',{'title':'Order'})
})
app.use((req,res)=>{
    res.render('404',{'title':'404'})
})
app.listen(3000,()=>{
    console.log("Server running at port 3000");
})