let h = document.getElementById("hour");
let m = document.getElementById("min");
let s = document.getElementById("sec");
let min_hand = document.getElementById("min_hand");
let sec_hand = document.getElementById("sec_hand");
let hour_hand = document.getElementById("hour_hand");

setInterval(function () {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hour < 10) {
    h.innerText = "0" + hour + ":";
  } else h.innerText = hour + ":";

  if (min < 10) {
    m.innerText = "0" + min + ":";
  } else m.innerText = min + ":";

  if (sec < 10) {
    s.innerText = "0" + sec;
  } else s.innerText = sec;

  h_rotation = 30 * hour + min / 2;
  min_rotation = 6 * (min + sec / 60);
  sec_rotation = 6 * sec;

  sec_hand.style.transform = `rotate(${sec_rotation}deg)`;
  min_hand.style.transform = `rotate(${min_rotation}deg)`;
  hour_hand.style.transform = `rotate(${h_rotation}deg)`;
}, 1000);
