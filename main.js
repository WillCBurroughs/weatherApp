
let holdText = document.getElementById("Version1");
holdText.textContent = "Hello";
holdText.classList.add("cityName");

// Where user will input zip code
let inputZip = document.createElement("input");
inputZip.classList.add("darkButton");

inputZip.placeholder = "Input Zipcode: "

inputZip.type = "number"

// Adding button to submit 
let submitZip = document.createElement("button");
submitZip.classList.add("lightButton");

submitZip.addEventListener("click", function(){
    loadIn(inputZip.value);
});

submitZip.textContent = "Submit Zip";

// Need to now add children and classes 
let holdTopPortion = document.createElement("div");

// Works 
holdTopPortion.classList.add("container")

// Need to add div for rows 
let holdTopRow = document.createElement("div");

holdTopRow.classList.add("row");
holdTopRow.classList.add("bg-success");
holdTopRow.classList.add("vw-75");


// Need to add cols for containing all the elements 
let holdZipCol = document.createElement("col"); 
let holdSubmitCol = document.createElement("col");

// Need to add cols styling for size 
holdZipCol.classList.add("col-12", "col-lg-4");
holdZipCol.classList.add("bg-primary");

holdSubmitCol.classList.add("col-12", "col-lg-4");
holdSubmitCol.classList.add("bg-black");

// Adds elements to top column
holdZipCol.appendChild(inputZip);
holdSubmitCol.appendChild(submitZip);

// Adds columns to top Row
holdTopRow.appendChild(holdZipCol); 
holdTopRow.appendChild(holdSubmitCol);

// Adding row and container
holdTopPortion.appendChild(holdTopRow);
document.body.appendChild(holdTopPortion);



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

}

window.addEventListener('DOMContentLoaded', function(){
    loadIn(40502);
}, false);

// Adding ability to call loadIn based on clicking zip code

