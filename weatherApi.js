// Goal: Enable your user to enter a city + country and return the temperature in Fahrenheit
// API Key: 12ca6514d9ef4f2b9d180411221710

document.querySelector('button').addEventListener('click', getTempInFah)

function getTempInFah(){
    const city = document.querySelector('input').value
    fetch(`https://api.weatherapi.com/v1/current.json?key=12ca6514d9ef4f2b9d180411221710&q=${city}&aqi=no`)

    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
        document.querySelector('h2').innerText = data.location.name
        document.querySelector('h3').innerText = data.current.temp_f+"°F"
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}