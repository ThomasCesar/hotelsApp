

// ============ INIT MODULES

// fetch app config
const config = require('./config')

// init express app
const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.json());

// init impala api
const impala = require('./impala')

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
    impala.getHotels( 
        {
            start : req.body.departure, 
            end : req.body.return, 
            country : {eq: req.body.country },
            // latitude: '58.386186',
            // longitude: '-9.952549',
            // radius: '5000',
            // sortBy: 'distance_m:desc'
        },
        ( theHotels )=>{
        res.write( theHotels )
        res.end()
    })
})

// ============ 404 PAGE

app.use(( req,res, next )=>{
    res.status(404)
    res.render('404.ejs',{ navMenu })
    next()
})

// ============ LAUNCH SERVER

app.listen( config.port )