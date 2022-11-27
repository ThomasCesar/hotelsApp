

// ============ INIT MODULES

// fetch app config
const config = require('./config')

// init express app
const express = require('express')
const app = express()
app.use(express.static('public'))

// ============ APP ROUTES

const navMenu = [
    {
        link : 'home',
        label : 'Accueil'
    },
    {
        link : 'about',
        label : 'A propos'
    }
]

app.get(['/','/home'], (req, res) => {
    res.render(
        'home.ejs',
        { navMenu }
    )
})

// ============ SCRIPT ROUTES

app.post('/hotels',(req,res)=>{
    res.write('getting hotels')
    res.end()
})

// ============ 404 PAGE

app.use(( req,res, next )=>{
    res.status(404)
    res.render('404.ejs',{ navMenu })
    next()
})

// ============ LAUNCH SERVER

app.listen( config.port )