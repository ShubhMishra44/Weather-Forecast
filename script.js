const apiKey = "905ad0b8fedfaa27494be600b9c38355"; // Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");
const forecastContainer = document.querySelector(".forecast");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    fetchForecast(city);
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    forecastContainer.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const day = data.list[i * 8];
        const div = document.createElement("div");
        div.classList.add("forecast-card");
        div.innerHTML = `<p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                         <p>${day.main.temp}°C</p>`;
        forecastContainer.appendChild(div);
    }
}

document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

