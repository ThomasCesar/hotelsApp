

// ================================ INT

const request = require('request');
const baseUrl = 'https://sandbox.impala.travel/v1'
const api_key = require('./implala_config.js')

// ================================ GET HOTELS

exports.getHotels = ( filters, callback ) => {
    request(
        {
            method: 'GET',
            url: baseUrl + '/hotels',
            qs: filters,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'sandb_ChgX6KXGZOBrxKxoWMJGtypnsK91sossu7YstE6g'
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
