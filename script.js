const locationSelector = document.getElementById("location-selector");
const getWeatherBtn = document.getElementById("get-weather-btn");

const locationElement = document.getElementById("location");

const mainTemperature = document.getElementById("main-temperature");
const weatherIcon = document.getElementById("weather-icon");
const weatherMain = document.getElementById("weather-main");

const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feels-like");

const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");

const compass = document.getElementById("compass");
const compassArrow = document.getElementById("compass-arrow");

async function showWeather(city) {
    const data = await getWeather(city);

    if (!data) {
        alert("Something went wrong, please try again later");
        return;
    }

    locationElement.textContent = data.name
        .split(' ')
        .map(e => e[0].toUpperCase() + e.slice(1))
        .join(' ');

    mainTemperature.textContent =
        `${data.main?.temp}° C` ?? "N/A";

    weatherMain.textContent =
        data.weather?.[0]?.main ?? "N/A";

    humidity.textContent =
        `Humidity: ${data.main?.humidity}%` ?? "N/A";

    feelsLike.textContent =
        `Feels like: ${data.main?.feels_like}° C` ?? "N/A";

    wind.textContent =
        `Wind: ${data.wind?.speed} m/s` ?? "N/A";

    if (data.wind?.gust === undefined) {
        windGust.textContent = "N/A";
    } else {
        windGust.textContent = `Gusts: ${data.wind.gust} m/s`;
    }

    weatherIcon.src =
        data.weather?.[0]?.icon ?? "";

    if (data.wind?.deg != null) {
        compassArrow.style.transform =
            `rotate(${data.wind.deg}deg)`;

        compass.classList.remove("hidden");
    }
}

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

getWeatherBtn.addEventListener("click", () => {
    const city = locationSelector.value;
    showWeather(city);
});