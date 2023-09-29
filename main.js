
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

tempDisplay.classList.add("cityName", "position-relative");
tempDisplay.style.textAlign = "right";
tempDisplay.style.top = "200px";
// tempDisplay.style.



// Add date to get current date and set that into 
let currentDate = new Date(); 

// Used for math 
let holdDay = parseInt(currentDate.getDate())

// //
let dateToDisplay = String(currentDate.getDate());

// Determining what date ender to add to dateToDisplay 
if(holdDay % 10 == 1 && holdDay / 10 != 1){
    dateToDisplay += "st";
} else if(holdDay % 10 == 2 && holdDay / 10 != 1){
    dateToDisplay += "nd";
} else if(holdDay % 10 == 3 && holdDay / 10 != 1){
    dateToDisplay += "rd";
} else {
    dateToDisplay += "th"
} 

// Adding month 
let holdMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let getMonth = currentDate.getMonth(); 

let holdDate = document.createElement("h3");
holdDate.innerText = dateToDisplay + " " + holdMonths[getMonth] + ","; 

// Used to unbold
let holdSpan = document.createElement("span"); 
holdSpan.classList.add("Unbold"); 

let dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

holdSpan.textContent = " " + String(dayOfWeek[currentDate.getDay()]);

holdDate.appendChild(holdSpan);

holdDate.classList.add("date");

holdImageDiv.appendChild(holdDate);

// console.log(dateToDisplay);

// console.log(currentDate); 


// Need to add left and right arrows 
let newArrow = document.createElement("i"); 

newArrow.classList.add("bi", "bi-arrow-left");

newArrow.style.fontSize = "100px";

newArrow.style.position = "relative"; 

newArrow.style.color = "white"

let holdButtons = document.createElement("div"); 

let rightArrow = document.createElement("i");

rightArrow.classList.add("bi", "bi-arrow-right");

rightArrow.style.fontSize = "100px";

rightArrow.style.position = "relative"; 

rightArrow.style.color = "white"

holdButtons.classList.add("d-flex", "justify-content-between", "align-items-center", "col-12", "vw-75", "bg-success", "p-3");

holdButtons.appendChild(newArrow);

holdButtons.appendChild(rightArrow);

holdImageDiv.appendChild(holdButtons);

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
    // console.log((rememberValue));

    // Checking to get main
    // console.log((rememberValue.data.weather[0].main))

    // let dataDisplay = await axios.get(urlVal)
    let dataDisplay = axios.get(urlVal)
        .then(response => {
            holdText.textContent = response.data.name;

            let holdVal = Math.round(response.data.main.temp);

            // Add functionality to determine what image should be 
            tempDisplay.textContent = Math.round(holdVal - 273.15) + "°C";


            let weatherCondition = response.data.weather[0].id;

            // Check if raining. If raining add rain image 
            if(weatherCondition >= 500 && weatherCondition < 600){
                holdImageDiv.style.backgroundImage = "url(img/Raining.jpg)";
            }
            else if(holdVal < 255){
                holdImageDiv.style.backgroundImage = "url(img/cold.jpg)";
            } else if(holdVal < 300){
                holdImageDiv.style.backgroundImage = "url(img/Temperate.jpg)";
            } else {
                holdImageDiv.style.backgroundImage = "url(img/Hot.jpg)";
            }

            
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

