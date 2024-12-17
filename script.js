const input = document.getElementById("search-input");
const description = document.getElementById("description-text");
const img = document.getElementById("description-img");
const locBtn = document.getElementById("loc-btn");
const section = document.querySelector("section");
const form = document.querySelector("form");

function getData(e) {
  e.preventDefault();

  if (!input.value) {
    alert("Please Enter a city name");
    return;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=ca695dcbc66c5fa3d0cb955033fd918f`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayWeather(data);
        document.getElementById("city").style.display = "block";
      });
  }
}

function getLocationData() {
  if (!navigator.geolocation) {
    alert("geolocation is not supported!");
    return;
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=ca695dcbc66c5fa3d0cb955033fd918f`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          displayWeather(data);
          document.querySelector("header h5").style.display = "none";
          document.getElementById("city").textContent = "current location";
        });
    });
  }
}

addEventListener("load", () => {
  updateTime(); // Call the function once when the page loads
});

function updateTime() {
  const dateElement = document.getElementById("date");
  const d = new Date();

  let currentDate = d.toString().slice(4, 15);

  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`; // Format the time in 12-hour format

  dateElement.innerHTML = `${currentDate} ${currentTime}`;
}

setInterval(updateTime, 1000);

function displayWeather(data) {
  document.querySelector("header h5").style.display = "block";

  const temp = (data.main.temp - 273.15).toFixed(1);
  console.log(temp);

  document.getElementById("temperature-degree").textContent = temp + "°";
  document.getElementById("city").textContent = input.value;

  document.getElementById("humidity-degree").textContent =
    data.main.humidity + " %";
  document.getElementById("feelslike-degree").textContent =
    (data.main.feels_like - 273.15).toFixed(1) + " °";

  description.textContent = data.weather[0].description;

  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  section.style.display = "block";
  section.classList.add("test");
  document.getElementById("city").style.display = "block";
  locBtn.style.display = "none";

  // console.log(document.getElementById("city"));
}

form.addEventListener("submit", getData);
