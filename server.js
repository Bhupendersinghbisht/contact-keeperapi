const express=require('express')
const app=express();
const connectDB=require('./config/db')
//const Router=require('router');
const cors=require('cors')
//var router=Router();
const PORT=process.env.PORT || 5001
//Connect DB
connectDB();

//Init Middleware
app.use(express.json())
app.use(cors())


app.get('/',(req,res) => res.json({'msg':'this is HTML'}))

app.post('/just',function(req,res){
    console.log('bbb',req.body)
    res.send('Its not valid')
}) 
//defining routes
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))
app.listen(PORT,() =>{
    console.log(`server started on ${PORT}`)
})