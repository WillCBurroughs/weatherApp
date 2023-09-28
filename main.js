
let holdText = document.getElementById("Version1");
holdText.textContent = "Hello";

// Where user will input zip code
let inputZip = document.createElement("input");
inputZip.type = "number"

document.body.appendChild(inputZip);


// Useful for getting zip
let apiKey = "77abea49302d916cfd2aab05e9372441";
let urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=42167&appid=" + apiKey;

async function loadIn(){

    let responseDate = await fetch(urlVal)

    let dataDisplay = await responseDate.json(); 

    console.log(dataDisplay);

    holdText.textContent = dataDisplay.name;

}

loadIn();