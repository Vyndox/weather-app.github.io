const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.querySelector('.weather-container');
const warningMessage = document.getElementById('warning-message');

// Get weather data from API
function getWeatherData(city) {
  const apiKey = '09c68d9f28946564230e9908b8b1ffe9'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const location = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        // Update weather information
        const weatherInfo = `
          <div class="location">${location}</div>
          <div class="temperature">${temperature}°C</div>
          <div class="description">${description}</div>
          <div class="icon">
            <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
          </div>
        `;
        weatherContainer.innerHTML = weatherInfo;

        weatherContainer.classList.add('visible'); // Make the weather container visible
        warningMessage.style.display = 'none'; // Hide the warning message
      } else {
        weatherContainer.classList.remove('visible'); // Hide the weather container
        warningMessage.style.display = 'block'; // Display the warning message
      }
    })
    .catch(error => {
      console.log('Error:', error);
      weatherContainer.innerHTML = 'An error occurred while fetching weather data.';
    });
}

// Search button click event
searchBtn.addEventListener('click', () => {
    const city = searchInput.value;
    if (city) {
      getWeatherData(city);
    }
  });
  
  // Search input enter key event
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const city = searchInput.value;
      if (city) {
        getWeatherData(city);
      }
    }
  });
  
