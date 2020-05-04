const input = document.querySelector(".city-search");
const searchBox = new google.maps.places.SearchBox(input);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place === null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setWeather(data, place.formatted_address);
    })
    .catch((err) => {
      console.log(err);
    });
});

const descriptionElement = document.querySelector("#weather-description");
const locationElement = document.querySelector("#city-name");
const windElement = document.querySelector("[data-wind]");
const tempElement = document.querySelector("[data-temperature]");
const precipElement = document.querySelector("[data-precip]");
const iconElement = document.querySelector("[icon");
function setWeather(data, place) {
  locationElement.textContent = place;
  descriptionElement.textContent = data.weather.description;
  descriptionElement.style.display = "block";
  windElement.textContent = `${data.wind_spd}`;
  tempElement.textContent = data.temp;
  precipElement.textContent = data.precip;
  iconElement.src = `icons/${data.weather.icon}.png`;
}
