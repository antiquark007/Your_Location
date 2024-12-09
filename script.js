"use strict";
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lng;
      whereAmI(lat, lng);
    },
    (error) => {
      console.error("Error occurred:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=917763724173815927563x52891` //there should be your api authentication code
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`Error fetching location: ${response.statusText}`);
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);
      const location = data.city
        ? `${data.city}, ${data.country}`
        : "Unknown location";
      document.getElementById("location").textContent = location;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      document.getElementById("location").textContent =
        "Error fetching location details.";
    });
};
