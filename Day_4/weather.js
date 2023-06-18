let search_data = document.querySelector(".search_posi");
let locate = "Hanoi"; // default value

search_data.addEventListener("submit", function (event) {
  event.preventDefault();
  locate = document.getElementById("find_locate").value;
  console.log(locate);
  document.getElementById("find_locate").value = "";
});

setInterval(() => {
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locate}`)
    .then(function (loca) {
      return loca.json();
    })
    .then(function (data) {
      let latitude = data.results[0].latitude;
      let longitude = data.results[0].longitude;
      let country = data.results[0].country;
      let city = data.results[0].name;
      let locate_dis = document.querySelector(".locate");
      if (country != city) {
        locate_dis.innerHTML = city + ", " + country;
      } else {
        locate_dis.innerHTML = country;
      }
      let timezone = data.results[0].timezone;
      let time_dis = document.querySelector(".time");
      let date = new Date();
      let time = date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour12: false,
      });
      let timeArray = time.split(":");
      let hours = timeArray[0];
      let minutes = timeArray[1];
      if (hours == 24) {
        hours = "00";
      }
      let weather_dis = document.querySelector(".weather");
      if (hours >= 6 && hours <= 12) {
        weather_dis.style.backgroundImage = "url('/Day_4/picture/moring.jpg')";
      } else if (hours >= 12 && hours <= 13) {
        weather_dis.style.backgroundImage =
          "url('/Day_4/picture/sunny_cat.jpg')";
      } else if (hours >= 13 && hours <= 18) {
        weather_dis.style.backgroundImage =
          "url('/Day_4/picture/afternoon.jpg')";
      } else
        weather_dis.style.backgroundImage = "url('/Day_4/picture/evening.jpg')";
      let timer = `${hours}:${minutes}`;
      time_dis.innerHTML = timer;
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
        .then(function (weather) {
          return weather.json();
        })
        .then(function (data) {
          let temp = Math.round(data.current_weather.temperature);
          let weather = document.querySelector(".temp");
          // temp.style.color = "white";
          weather.innerHTML = temp + "°C";
          let wind_spd = data.current_weather.windspeed;
          let wind = document.querySelector(".wind_spd_info");
          wind.innerHTML = wind_spd + " km/h";
          let wind_direc = data.current_weather.winddirection;
          let direction = document.querySelector(".wind_direc_info");
          direction.innerHTML = wind_direc + "°";
          let weather_code = data.current_weather.weathercode;
          if (
            weather_code == 61 ||
            weather_code == 63 ||
            weather_code == 65 ||
            weather_code == 66 ||
            weather_code == 67 ||
            weather_code == 77 ||
            weather_code == 80 ||
            weather_code == 81 ||
            weather_code == 82 ||
            weather_code == 95 ||
            weather_code == 96 ||
            weather_code == 99 ||
            weather_code == 51 ||
            weather_code == 53 ||
            weather_code == 55 ||
            weather_code == 56 ||
            weather_code == 57
          ) {
            weather_dis.style.backgroundImage = "url('/Day_4/picture/sad.gif')";
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    })
    .catch(function (e) {
      console.log(e);
    });
}, 1000);
