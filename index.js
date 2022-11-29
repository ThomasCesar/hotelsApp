

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
        label : 'Home'
    },
    {
        link : 'about',
        label : 'About'
    }
]

app.get(['/','/home'], (req, res) => {
    res.render(
        'home.ejs',
        { navMenu }
    )
})
app.get('/hotel', (req, res) => {
    const hotelId = req.query.hotelId
    const theHotel = impala.getHotel( 
        hotelId,
        ( payload )=>{
            const hotelData = JSON.parse(payload)
            
            // hotel non trouvé

            if( !hotelData || hotelData.code == 'VALIDATION_ERROR')
            {
                res.status(404)
                res.render('404.ejs',{ navMenu })
                res.end()
                return
            }

            // trouver l'image principale

            let hotelHeroImage = impala.findHotelHeroImage( hotelData )

            // page de l'hotel

            res.render(
                'hotel.ejs',
                { navMenu, hotelData, hotelHeroImage }
            )
        }
    )
})

// ============ SCRIPT ROUTES

app.post('/hotels',(req,res)=>{
    
    // fetch filters

    theFilters = {}
    if( req.body.departure ) theFilters.start = req.body.departure
    if( req.body.return ) theFilters.end = req.body.return
    if( req.body.country ) theFilters.country = {eq: req.body.country }
    if( req.body.offset ) theFilters.offset = req.body.offset

    // make api request

    impala.getHotels( 
        theFilters,
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