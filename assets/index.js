const apiKey = 'd5ea8452eca4ff7d7349944cb1cd6197'; 

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const searchHistory = document.getElementById('search-history');

// Event listener for form submission
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);
});

// Function to fetch weather data from the API
function getWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch current weather data
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      // Fetch 5-day forecast data
      fetch(forecastWeatherUrl)
        .then(response => response.json())
        .then(forecastData => {
          // Display current and future weather data
          displayWeatherData(data, forecastData);
        })
        .catch(error => {
          console.error('Error fetching forecast data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
    });
}

// Function to display current and future weather data
function displayWeatherData(currentData, forecastData) {
  const city = currentData.name;
  const date = new Date(currentData.dt * 1000).toLocaleDateString();
  const icon = currentData.weather[0].icon;
  const temperature = currentData.main.temp;
  const humidity = currentData.main.humidity;
  const windSpeed = currentData.wind.speed;

  // Display current weather information
  const currentWeatherHTML = `
    <div class="weather-container">
      <h2>${city} - ${date}</h2>
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
      <p>Temperature: ${temperature} °C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    </div>
  `;

  // Create the HTML for the 5-day forecast
  let forecastWeatherHTML = '<div><h2>5-Day Forecast</h2>';

  for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecast = forecastData.list[i];
    const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
    const forecastIcon = forecast.weather[0].icon;
    const forecastTemperature = forecast.main.temp;
    const forecastHumidity = forecast.main.humidity;
    const forecastWindSpeed = forecast.wind.speed;

    forecastWeatherHTML += `
      <section class="forcast-container>
        <p>Date: ${forecastDate}</p>
        <img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon">
        <p>Temperature: ${forecastTemperature} °C</p>
        <p>Humidity: ${forecastHumidity}%</p>
        <p>Wind Speed: ${forecastWindSpeed} m/s</p>
      </section>
    `;
  }

  forecastWeatherHTML += '</div>';

  // Update the weather information display
  weatherInfo.innerHTML = currentWeatherHTML + forecastWeatherHTML;

  // Save the city to search history
  saveToSearchHistory(city);
}


