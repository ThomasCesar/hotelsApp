

// ================================ INT

const request = require('request');
const baseUrl = 'https://sandbox.impala.travel/v1'
const config = require('./config.js')
const api_key = config.api_key

// ================================ GET HOTELS

exports.getHotels = ( filters, callback ) => {
    // filters = { size : 10 }
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
            // console.log(body )
            callback( body )
        }
    )
}
