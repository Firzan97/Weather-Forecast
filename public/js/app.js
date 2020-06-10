
const weatherform = document.querySelector('form')
const search= document.querySelector('input')
const messageTwo = document.querySelector('#message-1')
const messageOne = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    messageOne.textContent="Loading ..."
    messageTwo.textContent=""
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent=data.error
            }
            else
            {
            messageOne.textContent="Temperature is "+data.forecast.temperature+ " °C but it feels like "+data.forecast.feelslike+" °C"
            messageTwo.textContent=data.location
            }
        })
    }) 

    console.log(search.value)
})