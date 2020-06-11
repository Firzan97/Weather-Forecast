
const weatherform = document.querySelector('form')
const search= document.querySelector('input')
const messageTwo = document.querySelector('#message-1')
const messageOne = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const img = document.querySelector('#imageWeather')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    messageOne.textContent="Loading ..."
    messageTwo.textContent=""
    messageThree.textContent=""
    messageFour.textContent=""
    messageFive.textContent=""
    document.getElementById('imgWeather').src=""


    fetch('/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent=data.error
            }
            else
            {
            messageOne.textContent="Temperature is "+data.forecast.temperature+ " °C but it feels like "+data.forecast.feelslike+" °C"
            messageTwo.textContent=data.location
            messageThree.textContent="Chance for rain: "+data.forecast.chanceRain+"%"
            messageFour.textContent="Humidity: "+ data.forecast.humidity
            document.getElementById('imgWeather').src=data.forecast.icon
            messageFive.textContent= data.forecast.description
        }
        })
    }) 

    console.log(search.value)
})