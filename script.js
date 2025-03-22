document.addEventListener("DOMContentLoaded", () => {
    let cityInput = document.getElementById("city-input")
    let weatherBtn = document.getElementById("get-weather-btn")
    let weatherINfo = document.getElementById("weather-info")
    let cityDisplay = document.getElementById("city-name")
    let temperatureDisplay = document.getElementById("temperature")
    let discriptionDisplay = document.getElementById("description")
    let errormess = document.getElementById("error-message")
    const API_KEY = "ed017053551880322fc15453471adf53";

    weatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim()
        if (!city) { return; }

        //it may throw an error
        //the database is in another country , so it may take time 
        try {
            const weatheData = await fetchWeatherData(city);
            displaysWeatherData(weatheData)
        } catch (error) {
            showsError()
        }
        

    })

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    console.log("Fetching URL:", url);

    console.log("API Key:", API_KEY);






    async function fetchWeatherData(city) {
        //gets the city  data
        // const url = `b1b15e88fa797225412429c1c50c122a1">api.openweathermap.org/data/2.5/forecast?id&appid={api_Key}`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        let response = await fetch(url);
        console.log(typeof response);
        console.log("response", response);

        if (!response.ok) {
            throw new Error("City not found");

        }
        const data = await response.json()
        return data



    }







    function displaysWeatherData(data) {
        console.log(data);
        const name = data.name;
        const main = data.main;
        const weather = data.weather;
        cityDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}`;
        discriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        


        //remove hidden
        weatherINfo.classList.remove("hidden")
        errormess.classList.add("hidden");
        
    }




    function showsError() {
        //shows the eroor
        weatherINfo.classList.remove("hidden");
        errormess.classList.remove("hidden")

    }

  


})
