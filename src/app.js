const express = require("express")
const path = require('path')
const hbs = require('hbs')
const geocode= require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicDir =path.join(__dirname,"../public/")
const templatePath= path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

const app = express()

//define path for express directory
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)
//setup static directory
app.use(express.static(publicDir)) 

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Andrew Mead"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Andrew Mead"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Andrew Mead"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "Please provide the address"
        })
    }
    const address = req.query.address

    geocode(address, (error,{latitude,longitude,location}={})=>{
        if(error)
        {
            res.send(error)
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error)
            {
                res.send(error)
            }
            res.send({
                address: address,
                location: location,
                forecast: forecastData
            })
          })
        
    })

   
     

    




    // res.send({
    //     location: 'Tumpat, Kelantan',
    //     latitude: 45,
    //     longitude: -75
    // })
})



//dummy code for weather
app.get('/products', (req,res) => {
    if(!req.query.game)
    {
       return res.send({
           error: "You must provide a search term"
       })
    }
    else{

    }
    console.log(req.query.game)
   res.send({
       products: []
   }) 
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: "404",
        name: "Andrew Meat",
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
   res.render('404', {
       title: "404",
       name: "Andrew Meat",
       errorMessage: 'No page found'
   })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})