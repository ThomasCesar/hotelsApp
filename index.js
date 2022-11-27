const app = require('express')()
const config = require('./config')

app.get('/',(req,res)=>{
    res.write('Hello there')
    res.end()
})

app.listen( config.port )