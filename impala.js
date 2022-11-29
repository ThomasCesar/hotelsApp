

// ================================ INT

const request = require('request');
const baseUrl = 'https://sandbox.impala.travel/v1'
const config = require('./config.js')
const api_key = config.api_key

// ================================ GET HOTELS

exports.getHotels = ( filters, callback ) => {
    request(
        {
            method: 'GET',
            url: baseUrl + '/hotels',
            qs: filters,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': api_key
            }
        }
        , (error, response, body)=>{
            if (error)
            {
                throw new Error(error);
            }
            callback( body )
        }
    )
}
exports.getHotel = ( idHotel, callback ) => {
    request(
        {
            method: 'GET',
            url: baseUrl + '/hotels/' + idHotel,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': api_key
            }
        }
        , (error, response, body)=>{
            if (error)
            {
                throw new Error(error);
            }
            callback( body )
        }
    )
}
exports.findHotelHeroImage = ( hotelData ) =>{
    if( !hotelData || !hotelData.images.length )
    {
        return null
    }
    var heroImage = hotelData.images.find( img => {
        return img.isHeroImage == true
    })
    return heroImage
}
