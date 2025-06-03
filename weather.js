async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "f8b3dea5b6f8b60d46a38eb5eb884ec8";
  const resultBox = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

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
}
