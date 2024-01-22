const SALat = 29.533742701455772;
const SALong = -98.46952327754913;

function getAndSetWeather(lat = SALat, long = SALong, scrollToMap = false){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_KEY}&units=imperial`).then(data=>data.json())
        .then(currentWeather => {
             console.log(currentWeather);
            const date = dateFromTimeStamp(currentWeather.dt);
            const weatherCard = document.createElement("div");
            weatherCard.classList.add("weatherCard");
            let html = '<ul>';
            html += `<li>${date}</li>`;
            html += `<li>${currentWeather.main.temp}/${currentWeather.main.temp}</li>`;
            html += `<li><img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="icon representing ${currentWeather.weather[0].description}"></li>`
            html += `<li>Description: <span>${currentWeather.weather[0].description}</span></li>`;
            html += `<li>Humidity: <span>${currentWeather.main.humidity.toFixed(0)}</span></li>`;
            html += `<li>Wind: <span>${currentWeather.wind.speed}</span></li>`;
            html += `<li>Pressure: <span>${currentWeather.main.pressure}</span></li>`;
            html += '</ul>'
            weatherCard.innerHTML = html;
            document.getElementById("weather").appendChild(weatherCard);

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_KEY}&units=imperial`).then(data => data.json())
                .then(forecast => {
                    console.log(forecast);
                    // In the forecasts I am getting the weather every three hours for forty instances (5 days)
                    // I find out where each day ends by looking for every instance of the 22nd hour
                    // The forecasts are an array, data.lists, with a length of 40
                    // I push the indexes of the last forecasts for each day into an array
                    const dayEnds = [];
                    forecast.list.forEach((forecast, index) =>{
                        // console.log(formatTime(forecast.dt));
                        const dateTime = new Date(forecast.dt * 1000);
                        if (dateTime.getHours() === 21){
                            dayEnds.push(index);
                        }
                    });
                    for (let i = 0; i < dayEnds.length - 1; i++) {
                        // I want to get average temperature
                        const temperatures = [];
                        // I want the date
                        const date = dateFromTimeStamp(forecast.list[dayEnds[i] + 1].dt);
                        const day = dayOfWeekFromDayAbbreviated(forecast.list[dayEnds[i] + 1].dt);
                        // I want the most frequent weather pattern
                        const descriptions = [];
                        // I want the average humidity
                        const humidities = [];
                        // I want the average wind speed
                        const windSpeeds = [];
                        // I want the most frequent wind direction
                        const windDirections = [];

                        const pressures = [];
                        // The inner loop loops over each day, by starting a loop over the data.list array
                        // at an index one beyond the index recorded in the day-ends array, and going up to
                        // the following index point
                        for (let j = dayEnds[i] + 1; j <= dayEnds[i + 1]; j++) {
                            // I populate the various arrays I need in order to get
                            // averages or frequencies
                            descriptions.push(forecast.list[j].weather[0].description);
                            temperatures.push(forecast.list[j].main.temp);
                            windSpeeds.push(forecast.list[j].wind.speed);
                            windDirections.push(forecast.list[j].wind.deg);
                            humidities.push(forecast.list[j].main.humidity);
                            pressures.push(forecast.list[j].main.pressure);
                        }
                        // Here I get the most frequent description
                        const weatherPattern = mostFrequent(descriptions);
                        // Get the average wind speed
                        const windSpeed = average(windSpeeds).toFixed(2);
                        // Get the average humidity
                        const humidity = average(humidities).toFixed(2);
                        // Get the most frequent wind direction
                        const windDirection = windCardinalDirection(mostFrequent(windDirections));
                        const pressure = average(pressures).toFixed(0);
                        const maxTemp = Math.max(...temperatures);
                        const minTemp = Math.min(...temperatures);

                        // Now I need to get the icon. To accomplish this, now that I have the
                        // weather pattern decided on, I loop again until I find an example of
                        // the weather pattern and retrieve its associated icon
                        // if it is a nighttime symbol we replace it with the daytime symbol
                        let icon = '';
                        for (let j = dayEnds[i] + 1; j <= dayEnds[i + 1]; j++) {
                            if (forecast.list[j].weather[0].description === weatherPattern) {
                                icon = (forecast.list[j].weather[0].icon).replace('n', 'd');
                                break;
                            }
                        }
                        console.log(`On ${day} ${date}`);
                        console.log(`Main weather pattern is: ${weatherPattern}`);
                        console.log(`Icon is ${icon}`)
                        console.log(`The max will be ${Math.max(...temperatures)}`);
                        console.log(`The min will be ${Math.min(...temperatures)}`);
                        console.log(`Wind is ${windSpeed} mph ${windDirection}`);
                        console.log(`Humidity is ${humidity}%`);
                        console.log(`Pressure is ${pressure}`);


                        const dailyForecast = document.createElement("div");
                        dailyForecast.classList.add("weatherCard");
                        let html = '<ul>';
                        html += `<li>${date}</li>`;
                        html += `<li>${maxTemp}/${minTemp}</li>`;
                        html += `<li><img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon representing ${weatherPattern}"></li>`
                        html += `<li>Description: <span>${weatherPattern}</span></li>`;
                        html += `<li>Humidity: <span>${humidity}</span></li>`;
                        html += `<li>Wind: <span>${windSpeed}</span></li>`;
                        html += `<li>Pressure: <span>${pressure}</span></li>`;
                        html += '</ul>'
                        dailyForecast.innerHTML = html;
                        document.getElementById("weather").appendChild(dailyForecast);
                    }
                });
        });
}

getAndSetWeather();

