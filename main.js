
let holdText = document.getElementById("Version1");
holdText.textContent = "Hello";

// Where user will input zip code
let inputZip = document.createElement("input");
inputZip.type = "number"

document.body.appendChild(inputZip);

// Adding button to submit 
let submitZip = document.createElement("button");
submitZip.addEventListener("click", function(){
    loadIn(inputZip.value);
});
submitZip.textContent = "Submit Zip";

document.body.appendChild(submitZip);

// Useful for getting zip
let apiKey = "77abea49302d916cfd2aab05e9372441";
let urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=42167&appid=" + apiKey;

// Will pass in value to this that will be looked up
async function loadIn(zipVal){

    // Will return passed in val
    urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipVal + "&appid=" + apiKey;

    // let dataDisplay = await axios.get(urlVal)
    let dataDisplay = axios.get(urlVal)
        .then(response => {
            holdText.textContent = response.data.name
        })
        .catch(error => {
            holdText.textContent = `Invalid error: ${error}`;
            if (error.message.includes("4")) {
                holdText.textContent = "Zip code not found";
            }
            if(error.message.includes("5")) {
                holdText.textContent = "Our Servers are unable to process this request at this time. We apologize"
            }
        })
    

    console.log(dataDisplay);

    // holdText.textContent = dataDisplay.data.name;

}

window.addEventListener('DOMContentLoaded', function(){
    loadIn(40502);
}, false);

// Adding ability to call loadIn based on clicking zip code

