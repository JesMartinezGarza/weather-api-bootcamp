// Goal: Enable your user to enter a city + country and return the temperature in Fahrenheit

document.querySelector('button').addEventListener('click', getTemperature)

function getTemperature(){
    const city = document.querySelector('#whatCity').value
    const county = document.querySelector('#whatCounty').value
    const state = document.querySelector('#whatState').value
    const country = document.querySelector('#whatCountry').value

    
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

        const citiesFromThisCountry = data.results.filter(result => result.country === country.toString());
        const citiesFromThisState= data.results.filter(result => result.admin1 === state.toString());
        const citiesFromThisCounty= data.results.filter(result => result.admin2 === county.toString());

        let latitude = 0.0;
        let longitude = 0.0;

        if(citiesFromThisCounty.length !== 0 && county !== undefined){

            document.querySelector('#city').innerText = citiesFromThisCounty[0].name + ", " + citiesFromThisCounty[0].admin1 + " " + citiesFromThisCounty[0].country + " " + citiesFromThisCounty[0].postcodes[0];
            
            latitude = citiesFromThisCounty[0].latitude
            longitude = citiesFromThisCounty[0].longitude

            if(citiesFromThisCounty.length === 1){
                console.log(`There is ${citiesFromThisCounty.length} city in ${county} with the name of ${city}`)
            }else
                console.log(`There are ${citiesFromThisCounty.length} cities in ${county} with the name of ${city}`)
        
        }else if(citiesFromThisState.length !== 0 && state !== undefined){

            document.querySelector('#city').innerText = citiesFromThisState[0].name + ", " + citiesFromThisState[0].admin1 + " " + citiesFromThisState[0].country + " " + citiesFromThisState[0].postcodes[0];
            
            latitude = citiesFromThisState[0].latitude
            longitude = citiesFromThisState[0].longitude

            if(citiesFromThisState.length === 1){
                console.log(`There is ${citiesFromThisState.length} city in ${state} with the name of ${city}`)
            }else
                console.log(`There are ${citiesFromThisState.length} cities in ${state} with the name of ${city}`)

        }else if(citiesFromThisCountry.length !== 0 && country !== undefined){

            console.log(citiesFromThisCountry)
            console.log('Length: ' + citiesFromThisCountry.length)
            console.log(citiesFromThisCountry[0])
            console.log(citiesFromThisCountry[0].name)

            document.querySelector('#city').innerText = citiesFromThisCountry[0].name + ", " + citiesFromThisCountry[0].admin1 + " " + citiesFromThisCountry[0].country + " "
            
            latitude = citiesFromThisCountry[0].latitude
            longitude = citiesFromThisCountry[0].longitude

            if(citiesFromThisCountry.length === 1){
                console.log(`There is ${citiesFromThisCountry.length} city in ${country} with the name of ${city}`)
            }else
                console.log(`There are ${citiesFromThisCountry.length} cities in ${country} with the name of ${city}`)
        }else
            console.log('No matches found with this criteria.')
        
        

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            let tempF = (data.current_weather.temperature * 1.8 + 32).toFixed(2)
            let weatherCode = data.current_weather.weathercode
            let windSpeed = data.current_weather.windspeed
            let windDirection = data.current_weather.winddirection

            let weatherForecast = '';
            let compassDirection = '';

            console.log(data.current_weather)
            console.log(`Temperature in ${city}: ${tempF} °F`)
            document.querySelector('#temperature').innerText = tempF + ' °F'

            if(weatherCode === 0){
                weatherForecast = 'Clear Sky';
            }else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3){
                weatherForecast = 'Mainly clear, partly cloudy, and overcast';
            }else if (weatherCode === 45 || weatherCode === 48){
                weatherForecast = 'Fog and depositing rime fog';
            }else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55){
                weatherForecast = 'Drizzle: Light, moderate, and dense intensity';
            }else if (weatherCode === 56 || weatherCode === 57){
                weatherForecast = 'Freezing Drizzle: Light and dense intensity';
            }else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65){
                weatherForecast = 'Rain: Slight, moderate and heavy intensity';
            }else if (weatherCode === 66 || weatherCode === 67){
                weatherForecast = 'Freezing Rain: Light and heavy intensity';
            }else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75){
                weatherForecast = 'Snow fall: Slight, moderate, and heavy intensity';
            }else if (weatherCode === 77){
                weatherForecast = 'Snow grains';
            }else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82){
                weatherForecast = 'Rain showers: Slight, moderate, and violent';
            }else if (weatherCode === 85 || weatherCode === 86){
                weatherForecast = 'Snow showers slight and heavy';
            }else if (weatherCode === 95){
                weatherForecast = 'Thunderstorm: Slight or moderate';
            }else if (weatherCode === 96 || weatherCode === 99){
                weatherForecast = 'Thunderstorm with slight and heavy hail';
            }else{
                weatherForecast = 'Weather Code not recognized.'
            }

            if(windDirection > 340 || windDirection <= 10){
                compassDirection = 'N'
            }else if(windDirection > 10 && windDirection <= 30){
                compassDirection = 'N/NE'
            }else if(windDirection > 30 && windDirection <= 50){
                compassDirection = 'NE'
            }else if(windDirection > 50 && windDirection <= 70){
                compassDirection = 'E/NE'
            }else if(windDirection > 70 && windDirection <= 100){
                compassDirection = 'E'
            }else if(windDirection > 100 && windDirection <= 120){
                compassDirection = 'E/SE'
            }else if(windDirection > 120 && windDirection <= 140){
                compassDirection = 'SE'
            }else if(windDirection > 140 && windDirection <= 160){
                compassDirection = 'S/SE'
            }else if(windDirection > 160 && windDirection <= 190){
                compassDirection = 'S'
            }else if(windDirection > 190 && windDirection <= 210){
                compassDirection = 'S/SW'
            }else if(windDirection > 210 && windDirection <= 230){
                compassDirection = 'SW'
            }else if(windDirection > 230 && windDirection <= 250){
                compassDirection = 'W/SW'
            }else if(windDirection > 250 && windDirection <= 280){
                compassDirection = 'W'
            }else if(windDirection > 280 && windDirection <= 300){
                compassDirection = 'W/NW'
            }else if(windDirection > 300 && windDirection <= 320){
                compassDirection = 'NW'
            }else if(windDirection > 320 && windDirection <= 340){
                compassDirection = 'N/NW'
            }else{
                compassDirection = 'Compass direction could not be calculated.'
            }


            document.querySelector('#weatherCode').innerText = weatherForecast;
            document.querySelector('#windSpeed').innerText = windSpeed + ' mph';
            document.querySelector('#windDirection').innerText = windDirection + " °" + " " + compassDirection;

        })


        .catch(error => {
            console.log(`error ${error}`)
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}