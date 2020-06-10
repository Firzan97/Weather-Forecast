const request = require("request")

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmlyemFuOTciLCJhIjoiY2tiNnJjMW12MDFnNDMwbnVoOXUwZWlsaiJ9.dlsRNHcO6vbeuJWjNWO8vw"
     
    request({url, json: true},(error,{body}) => {
        if(error)
        {
            callback("Unable to locate the api service",undefined)
        }
        else if(body.features.length===0)
        {
            callback("Unable to find the location",undefined)
        }
        else 
        {
        const latitude= body.features[0].center[1]
        const longitude= body.features[0].center[0]
        const location= body.features[0].place_name
        const data= {latitude,longitude,location}
        callback(error,data)
        }
      })
  }

  
module.exports = geocode