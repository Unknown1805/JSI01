fetch("https://jsonplaceholder.typicode.com/photos")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    let html = "";
    for (let i = 0; i < 10; i++) {
      html += ` 
        <div class="container">       
        <div class="img"><img src="${data[i].url}" /></div>
        <h2>Id: <span>${data[i].id}</span></h2>  
        <h3>Title: <span>${data[i].title}</span></h3>
        <button class="buttons">Button</button>
        </div>`;
    }
    let all = document.querySelector(".all");
    all.innerHTML = html;
  })
  .catch(function (e) {
    console.log(e);
  });
