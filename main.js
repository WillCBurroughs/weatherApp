
let holdText = document.createElement("h1");
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

// Row that sometimes holds city 
let holdCityName = document.createElement("col")

// Need to add cols styling for size 
holdZipCol.classList.add("col-12", "col-lg-4", "order-1", "order-lg-2");
holdZipCol.classList.add("bg-primary");

holdSubmitCol.classList.add("col-12", "col-lg-4", "order-2", "order-lg-3");
holdSubmitCol.classList.add("bg-black");

// Holds city 
holdCityName.classList.add("col-12", "col-lg-4", "order-3", "order-lg-1")
// holdCityName.classList.add("bg-white");

// Adds elements to top column
holdZipCol.appendChild(inputZip);
holdSubmitCol.appendChild(submitZip);
holdCityName.appendChild(holdText);

// Adds columns to top Row
holdTopRow.appendChild(holdCityName);
holdTopRow.appendChild(holdZipCol); 
holdTopRow.appendChild(holdSubmitCol);

// Adding row and container
holdTopPortion.appendChild(holdTopRow);
document.body.appendChild(holdTopPortion);

// Div that will contain image 
let tempImage = document.createElement("div");

// Need something that will hold this image in a div 
let holdImageDiv = document.createElement("div")
holdImageDiv.classList.add("container", "bg-success", "holdFullImage", "vw-75");
holdImageDiv.appendChild(tempImage);

holdImageDiv.style.backgroundImage = "url(img/Hot.jpg)";
holdImageDiv.style.backgroundSize = "cover";
holdImageDiv.style.backgroundRepeat = "no-repeat"; 

// Adding temperature to be displayed on the screen 
let tempDisplay = document.createElement("h2");
tempDisplay.innerText = "Display Value"; 

tempDisplay.classList.add("cityName")

holdImageDiv.appendChild(tempDisplay);

// Adding div to page 
document.body.appendChild(holdImageDiv);


// Useful for getting zip
let apiKey = "77abea49302d916cfd2aab05e9372441";
let urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=42167&appid=" + apiKey;

// Will pass in value to this that will be looked up
async function loadIn(zipVal){

    // Will return passed in val
    urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipVal + "&appid=" + apiKey;

    // Remove this in a minute 
    // let rememberValue = await axios.get(urlVal); 

    // // This is what we set the temperature equal to 
    // console.log(Math.round(rememberValue.data.main.temp));

    // let dataDisplay = await axios.get(urlVal)
    let dataDisplay = axios.get(urlVal)
        .then(response => {
            holdText.textContent = response.data.name;

            let holdVal = Math.round(response.data.main.temp);
            // Add functionality to determine what image should be 
            tempDisplay.textContent = holdVal;

            

            
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

