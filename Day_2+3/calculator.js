let display = document.getElementById("display");
let buttons = document.querySelectorAll(".calculator button");
let data = localStorage.getItem("values");
let valuess = data ? JSON.parse(data) : [];
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (this.textContent === "=") {
      display.value = eval(display.value);
      valuess.push(eval(display.value));
      localStorage.setItem("values", JSON.stringify(valuess));
      updateHistory();
    } else if (this.textContent === "Del") {
      display.value = display.value.substring(0, display.value.length - 1);
    } else {
      display.value += this.textContent;
    }
  });
});

function updateHistory() {
  let history = document.getElementById("history");
  history.innerHTML = "";
  valuess.forEach(function (value) {
    let div = document.createElement("div");
    div.textContent = value;
    history.appendChild(div);
  });
}

updateHistory();
