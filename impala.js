

// ================================ INT

const request = require('request');
const baseUrl = 'https://sandbox.impala.travel/v1'
const api_key = require('./implala_config.js')

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
