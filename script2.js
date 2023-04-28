const apiKey = "9c1f15a764b80f4a96a21c318ed2710f";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const locationElement = document.querySelector(".location");
const weatherElement = document.querySelector(".weather");
const temperatureElement = document.querySelector(".temperature");
const sunriseElement = document.querySelector(".sunrise .value");
const sunsetElement = document.querySelector(".sunset .value");
const windElement = document.querySelector(".wind .value");
const humidityElement = document.querySelector(".humidity .value");

// Obtém a localização do usuário
function getLocation() {
  navigator.geolocation.getCurrentPosition(getWeatherFromLocation, handleError);
}

// Obtém a previsão do tempo com base nas coordenadas de localização
function getWeatherFromLocation(position) {
  const { latitude, longitude } = position.coords;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
    .catch(handleError);
}

// Obtém a previsão do tempo com base no nome da cidade
function getWeatherFromCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => updateWeatherData(data))
    .catch(handleError);
}

// Atualiza os dados da previsão do tempo no DOM
function updateWeatherData(data) {
  locationElement.innerHTML = data.name + ", " + data.sys.country;
  weatherElement.innerHTML = data.weather[0].description;
  temperatureElement.innerHTML = Math.round(data.main.temp) + "°C";
  sunriseElement.innerHTML = getTimeString(data.sys.sunrise);
  sunsetElement.innerHTML = getTimeString(data.sys.sunset);
  windElement.innerHTML = data.wind.speed + " km/h";
  humidityElement.innerHTML = data.main.humidity + "%";
}

// Converte um timestamp em uma string com o horário
function getTimeString(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Trata erros da requisição da API
function handleError(error) {
  alert("Não foi possível obter a previsão do tempo. Por favor, tente novamente mais tarde.");
  console.error(error);
}

// Adiciona o evento de clique no botão de pesquisa
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherFromCity(city);
    searchInput.value = "";
  } else {
    alert("Por favor, digite o nome de uma cidade.");
  }
});

// Adiciona o evento de tecla pressionada no campo de pesquisa
searchInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

// Obtém a localização do usuário ao carregar a página
getLocation();
