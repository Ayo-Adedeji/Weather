const cityInput = document.getElementById("cityInput");
const resultBox = document.getElementById("weatherResult");
const button = document.querySelector("button");
const apiKey = "f8b3dea5b6f8b60d46a38eb5eb884ec8";
const body = document.body;

const setBackground = (weather) => {
  const lower = weather.toLowerCase();
  if (lower.includes("cloud")) {
    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy')";
  } else if (lower.includes("rain")) {
    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rain')";
  } else if (lower.includes("clear")) {
    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny')";
  } else if (lower.includes("snow")) {
    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow')";
  } else {
    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
  }
};

const showLoader = () => {
  resultBox.innerHTML = `<div class="loader"></div>`;
};

const fetchWeather = async () => {
  const city = cityInput.value.trim();

  if (!city) {
    resultBox.innerHTML = `<p style="color: orange;"><i class="fas fa-exclamation-circle"></i> Please enter a city name.</p>`;
    return;
  }

  showLoader();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    setBackground(data.weather[0].main);

    resultBox.innerHTML = `
      <h3><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h3>
      <p><i class="fas fa-thermometer-half"></i> Temp: ${data.main.temp}°C</p>
      <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
      <p><i class="fas fa-wind"></i> Wind: ${data.wind.speed} m/s</p>
      <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].main}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"/>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color: red;"><i class="fas fa-exclamation-circle"></i> ${error.message}</p>`;
  }
};

button.addEventListener("click", fetchWeather);

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchWeather();
  }
});
