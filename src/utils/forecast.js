const request = require("request")

const forecast = (longitude,latitude, callback) => {
 const url="http://api.weatherstack.com/current?access_key=c58c6f1e2ad67ebe6fb5f86d551039cf&query="+latitude+"," +longitude+"&units=m"
  
 request({url, json: true},(error,{body})=>{
     if( error)
     {
         callback("There is no internet connection", undefined)
     }
     else if(body.error)
     {
         callback("Unable to find location")
     }
     else
     {
        callback(undefined,{
            temperature: body.current.temperature,
            feelslike: body.current.feelslike,
            icon: body.current.weather_icons,
            description: body.current.weather_descriptions,
            chanceRain: body.current.precip,
            humidity: body.current.humidity,
            windSpeed: body.current.wind_speed
        })
     }

 })
}

module.exports = forecast