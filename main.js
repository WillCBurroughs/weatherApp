


// Used to keep up with currentValue 
let currentValue;
let currentIndex;

let holdText = document.createElement("h1");
holdText.textContent = "Hello";
holdText.classList.add("cityName");

let arrayOfValues;

// First need to check if arrayOfValues has a value 
// If value saved save that in 
if(localStorage.getItem("SavingZips") !== null){
    arrayOfValues = JSON.parse(localStorage.getItem("SavingZips"));

    // If no value is present default to Lexington
    if(arrayOfValues.length === 0){
        arrayOfValues = [40502];
        localStorage.setItem("SavingZips", JSON.stringify(arrayOfValues));
    }

} else {
    arrayOfValues = [40502]
    localStorage.setItem("SavingZips", JSON.stringify(arrayOfValues));
}

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
holdTopRow.classList.add("vw-75");

// Creating delete button 

let deleteBtn = document.createElement("div");
deleteBtn.textContent = "X"
deleteBtn.classList.add("deleteBtn", "col-2", "col-lg-1", "order-lg-4", "order-2");

// Need to delete value from array and return firstVal or secondVal
async function deleteLocation() {

    // Can only call this while location is greater than 1 

    if(arrayOfValues.length > 1){
    // First value is gone 
    arrayOfValues = arrayOfValues.filter(value => value != currentValue);
    }

    // Can now call loadIn at zero index 
    await loadIn(arrayOfValues[0]);
    imageHourly.src = getImageForHour(response);

}

deleteBtn.addEventListener("click", function(){
    deleteLocation(); 
})

// Need to add cols for containing all the elements 
let holdZipCol = document.createElement("col"); 
let holdSubmitCol = document.createElement("col");

// Row that sometimes holds city 
let holdCityName = document.createElement("col")

// Need to add cols styling for size 
holdZipCol.classList.add("col-10", "col-lg-4", "order-1", "order-lg-2");

holdSubmitCol.classList.add("col-12", "col-lg-4", "order-3", "order-lg-3");


// Holds city 
holdCityName.classList.add("col-12", "col-lg-3", "order-4", "order-lg-1")
// holdCityName.classList.add("bg-white");

// Adds elements to top column
holdZipCol.appendChild(inputZip);
holdSubmitCol.appendChild(submitZip);
holdCityName.appendChild(holdText);

// Adds columns to top Row
holdTopRow.appendChild(holdCityName);
holdTopRow.appendChild(deleteBtn);
holdTopRow.appendChild(holdZipCol); 
holdTopRow.appendChild(holdSubmitCol);

// Adding row and container
holdTopPortion.appendChild(holdTopRow);
document.body.appendChild(holdTopPortion);

// Div that will contain image 
let tempImage = document.createElement("div");

// Need something that will hold this image in a div 
let holdImageDiv = document.createElement("div")
holdImageDiv.classList.add("container", "holdFullImage", "vw-75", "background-image");



holdImageDiv.appendChild(tempImage);

holdImageDiv.style.backgroundImage = "url(img/Hot.jpg)";
holdImageDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
holdImageDiv.style.backgroundSize = "cover";
holdImageDiv.style.backgroundRepeat = "no-repeat"; 

// Adding temperature to be displayed on the screen 
let tempDisplay = document.createElement("h2");
tempDisplay.innerText = "Display Value"; 

tempDisplay.classList.add("cityName", "position-relative");
tempDisplay.style.textAlign = "right";
tempDisplay.style.fontSize = "100px";
tempDisplay.style.top = "150px";
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

holdDate.classList.add("position-relative")

// Used to unbold
let holdSpan = document.createElement("span"); 
holdSpan.classList.add("Unbold"); 

let divDate = document.createElement("div");
divDate.style.zIndex = 4;
divDate.appendChild(holdDate);

let dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

holdSpan.textContent = " " + String(dayOfWeek[currentDate.getDay()]);

holdDate.appendChild(holdSpan);

holdDate.classList.add("date", "cityName");

holdDate.style.fontSize = "40px";

holdImageDiv.appendChild(divDate);

// console.log(dateToDisplay);

// console.log(currentDate); 


// Need to add left and right arrows 
let newArrow = document.createElement("i"); 

newArrow.classList.add("bi", "bi-arrow-left");

newArrow.style.fontSize = "100px";

newArrow.style.position = "relative"; 

newArrow.style.color = "white"


async function moveLeft(){
    
    console.log('Before if condition - currentValue:', currentValue);

    // You are currently on the leftMost value, go to rightmost val 
    if(currentValue === arrayOfValues[0]){
        currentValue = arrayOfValues[arrayOfValues.length - 1];
        await loadIn(arrayOfValues[arrayOfValues.length - 1]);
    } else {
        
        // Correct up to here 
        console.log('Array of values:', arrayOfValues);

        for(let i = 0; i < arrayOfValues.length; i++){
            if(arrayOfValues[i] == currentValue){
                currentIndex = i;
                break;
            }
        }

        console.log('Current index:', currentIndex);

        // If the user is on the rightmost value in the array, move to the leftmost value.
        if (currentIndex === 0) {
            await loadIn(arrayOfValues[arrayOfValues.length - 1]);
            currentValue = arrayOfValues[arrayOfValues.length - 1];
        } else {
            await loadIn(arrayOfValues[currentIndex - 1]);
            currentValue = arrayOfValues[currentIndex - 1];
        }
    }

    imageHourly.src = getImageForHour(response);
    // Need to move through array and textValue of array
}

newArrow.addEventListener("click", async function(){
    await moveLeft();
})


let holdButtons = document.createElement("div"); 

let rightArrow = document.createElement("i");

rightArrow.classList.add("bi", "bi-arrow-right");

rightArrow.style.fontSize = "100px";

rightArrow.style.position = "relative"; 

rightArrow.style.color = "white"

holdButtons.classList.add("d-flex", "holdButton", "position-relative", "justify-content-between", "align-items-center", "col-12", "vw-75", "p-3");


async function moveRight(){
    
    console.log('Before if condition - currentValue:', currentValue);

    // You are currently on the rightmost value, go to the leftmost value 
    if(currentValue === arrayOfValues[arrayOfValues.length - 1]){
        currentValue = arrayOfValues[0];
        await loadIn(arrayOfValues[0]);
    } else {
        
        for(let i = 0; i < arrayOfValues.length; i++){
            if(arrayOfValues[i] == currentValue){
                currentIndex = i;
                break;
            }
        }

        console.log('Current index:', currentIndex);

        // If the user is on the rightmost value in the array, move to the leftmost value.
        if (currentIndex === arrayOfValues.length - 1) {
            await loadIn(arrayOfValues[0]);
            currentValue = arrayOfValues[0];
        } else {
            await loadIn(arrayOfValues[currentIndex + 1]);
            currentValue = arrayOfValues[currentIndex + 1];
        }
    }

    
    // Need to move through array and textValue of array
}

rightArrow.addEventListener("click", async function(){
    await moveRight();
})


// Need to add 2 functions one for left and one for right. When pressing left or right you move to value in array
// If there is already a value in the array, you just move to that value

// Need to add function for moving through 

holdButtons.appendChild(newArrow);
holdButtons.appendChild(rightArrow);

// Should only append below function when the length of the arrayOfValues is greater than 1 
console.log(arrayOfValues.length);

// Adding buttons to holdImageDiv
holdImageDiv.appendChild(holdButtons);

// Checking if buttons should be visible
if (arrayOfValues.length >= 2) {
    holdButtons.style.visibility = "visible"; // Make the buttons visible
} else {
    holdButtons.style.visibility = "hidden";
}

holdImageDiv.appendChild(tempDisplay);

// Adding div to page 
document.body.appendChild(holdImageDiv);


let holdWind = document.createElement("div");
holdWind.classList.add("col", "col-3", "col-lg-2", "trio");

let windImage = document.createElement("img");
windImage.classList.add("iconToAdd"); 
windImage.src = "img/Wind.png";

holdWind.appendChild(windImage);

let windText = document.createElement("h3");
windText.textContent = "Wind";
windText.classList.add("mainText");

holdWind.appendChild(windText);

let windValue = document.createElement("p");
windValue.classList.add("valueNumber")

holdWind.appendChild(windValue);

let holdPressure = document.createElement("div");
holdPressure.classList.add("col", "col-3","col-lg-2", "trio");

let pressureImage = document.createElement("img"); 
pressureImage.classList.add("iconToAdd"); 
pressureImage.src = "img/thermometer.png"

holdPressure.appendChild(pressureImage); 

let pressureText = document.createElement("h3");
pressureText.textContent = "Pressure";
pressureText.classList.add("mainText");

holdPressure.appendChild(pressureText);

let pressureValue = document.createElement("p");
pressureValue.classList.add("valueNumber");

holdPressure.appendChild(pressureValue);

let holdHumidity = document.createElement("div");
holdHumidity.classList.add("col", "col-3","col-lg-2", "trio");

let humidityImage = document.createElement("img");
humidityImage.classList.add("iconToAdd");
humidityImage.src = "img/humidity.png"

holdHumidity.appendChild(humidityImage);

let humidityText = document.createElement("h3");
humidityText.textContent = "Humidity";
humidityText.classList.add("mainText");

holdHumidity.appendChild(humidityText);

let humidityValue = document.createElement("p");
humidityValue.classList.add("valueNumber")

holdHumidity.appendChild(humidityValue);

let newRow = document.createElement("div");
newRow.classList.add("row", "sm-justify-content-between");

let trioContainer = document.createElement("div");
trioContainer.classList.add("container", "vw-75");

let holdHourly = document.createElement("div");
holdHourly.classList.add("col-11", "col-lg-5", "holdHourly", "justify-content-between", "d-flex"); 

// let currentHour = 

console.log("Hour Val" , currentDate.getHours());

let nowTime = document.createElement("div");
nowTime.classList.add("col", "col-3", "d-flex", "flex-column", "align-items-center", "text-center");

let currentHour = document.createElement("p");
currentHour.classList.add("hourTexts");
currentHour.textContent = "Now";

let imageHourly = document.createElement("img"); 
imageHourly.classList.add("hourlyIcons")

nowTime.appendChild(currentHour);
nowTime.appendChild(imageHourly);

let currentTemp = document.createElement("p");
currentTemp.classList.add("hourTexts")

nowTime.appendChild(currentTemp);
holdHourly.appendChild(nowTime);


let nextTime = document.createElement("div"); 
nextTime.classList.add("col", "col-3", "d-flex", "flex-column", "align-items-center", "text-center");

let nextHour = document.createElement("p"); 
nextHour.classList.add("hourTexts"); 
nextHour.textContent = "12:00pm"; 

let imageNextHourly = document.createElement("img"); 
imageNextHourly.classList.add("hourlyIcons"); 

nextTime.appendChild(nextHour); 
nextTime.appendChild(imageNextHourly); 

let nextTemp = document.createElement("p"); 
nextTemp.classList.add("hourTexts"); 
nextTemp.textContent = "assa"

nextTime.appendChild(nextTemp); 
holdHourly.appendChild(nextTime);

let secondNextTime = document.createElement("div"); 
secondNextTime.classList.add("col", "col-3", "d-flex", "flex-column", "align-items-center", "text-center");

let nextNextHour = document.createElement("p"); 
nextNextHour.classList.add("hourTexts");
nextNextHour.textContent = "3:00pm"; 

let imageNextNextHourly = document.createElement("img");
imageNextNextHourly.classList.add("hourlyIcons"); 

secondNextTime.appendChild(nextNextHour);
secondNextTime.appendChild(imageNextNextHourly); 

let nextNextTemp = document.createElement("p"); 
nextNextTemp.classList.add("hourTexts");

nextNextTemp.textContent = "It is here";

secondNextTime.appendChild(nextNextTemp);

holdHourly.appendChild(secondNextTime);

let threeNextTime = document.createElement("div"); 
threeNextTime.classList.add("col", "col-3", "d-flex", "flex-column", "align-items-center", "text-center");

let threeNextHour = document.createElement("p"); 
threeNextHour.classList.add("hourTexts"); 
threeNextHour.textContent = "6:00pm"; 

let imageLastHourly = document.createElement("img");
imageLastHourly.classList.add("hourlyIcons");

threeNextTime.appendChild(threeNextHour);
threeNextTime.appendChild(imageLastHourly); 

let lastTemp = document.createElement("p");
lastTemp.classList.add("hourTexts"); 

lastTemp.textContent = "Last";
threeNextTime.appendChild(lastTemp);

holdHourly.appendChild(threeNextTime);


newRow.appendChild(holdWind);
newRow.appendChild(holdPressure);
newRow.appendChild(holdHumidity);





newRow.appendChild(holdHourly);

trioContainer.appendChild(newRow);
document.body.appendChild(trioContainer);





// This function is used to test if a value is already in the array. 
// If this is already in the array, we don't want to push to array
// I need to call this value when adding a new value
function addNewValueToArray(array,value){
    if(array.includes(value) === false){
        array.push(value);
    }

    // This is done to set the new value each time
    localStorage.setItem("SavingZips", JSON.stringify(array));
    return array;
}

// I need to get date time and use that 
function getImageForHour(mainWeather){
    console.log(mainWeather.data.weather[0].main); 
    if(mainWeather.data.weather[0].main === "Clear"){
        return "img/Sun.png";
    } else if (mainWeather.data.weather[0].main === "Clouds"){
        return "img/cloudy.png";
    } else {
        return "img/Rain.png";
    }
}

// I need to get date time and use that 
// Will work for getting next 3 values 
// Need to pass response.data.list[Value] Where value is 1 for 1 2 for 2 and 3 for 3 
function getNextImagesForHour(Index){
    console.log(Index.weather[0].main); 
    if(Index.data.weather[0].main === "Clear"){
        return "img/Sun.png";
    } else if (Index.data.weather[0].main === "Clouds"){
        return "img/cloudy.png";
    } else {
        return "img/Rain.png";
    }
}


// Useful for getting zip
let apiKey = "77abea49302d916cfd2aab05e9372441";
let urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=42167&appid=" + apiKey;


// Will pass in value to this that will be looked up
async function loadIn(zipVal){

    // Will return passed in val
    urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipVal + "&appid=" + apiKey;

    console.log("API Request URL:", urlVal);
    // Remove this in a minute 
    let rememberValue = await axios.get(urlVal); 

    // This is what we set the temperature equal to 
    console.log((rememberValue));

    // Checking to get main
    // console.log((rememberValue.data.weather[0].main))

    // let dataDisplay = await axios.get(urlVal)
    let dataDisplay = axios.get(urlVal)
        .then(response => {
            holdText.textContent = response.data.name;

            let holdVal = Math.round(response.data.main.temp);

            // Add functionality to determine what image should be 
            tempDisplay.textContent = Math.round(((holdVal - 273.15) * 9/5) + 32) + "°F";

            let windSpeed = String(Math.round(response.data.wind.speed)) + " Km/h";

            windValue.textContent = windSpeed;

            let pressurehold = String(Math.round(response.data.main.pressure)) + " hPa";

            pressureValue.textContent = pressurehold; 

            let holdHumid = String(Math.round(response.data.main.humidity)) + " %";

            humidityValue.textContent = holdHumid; 

            let weatherCondition = response.data.weather[0].id;
            let weatherType = response.data.weather[0].main; 

            // Check if raining. If raining add rain image "https://api.openweathermap.org/data/2.5/weather?zip=40502&appid=77abea49302d916cfd2aab05e9372441"
            if(weatherCondition >= 500 && weatherCondition < 600){
                holdImageDiv.style.backgroundImage = "url(img/Raining.jpg)";
            }
            else if(holdVal < 280){
                holdImageDiv.style.backgroundImage = "url(img/cold.jpg)";
            } else if(holdVal < 300){
                holdImageDiv.style.backgroundImage = "url(img/Temperate.jpg)";
            } else {
                holdImageDiv.style.backgroundImage = "url(img/Hot.jpg)";
            }
                holdImageDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            // I can call the function to set the array and I can console.log to see value
            arrayOfValues = addNewValueToArray(arrayOfValues, JSON.parse(zipVal));
            console.log(arrayOfValues);
           
            // Checking if buttons should be visible
            if (arrayOfValues.length >= 2) {
                holdButtons.style.visibility = "visible"; // Make the buttons visible
            } else {
                holdButtons.style.visibility = "hidden";
            }

            // In this condition index is valid 
            currentValue = zipVal;
            console.log(currentValue);

            if(weatherType === "Clear"){
                imageHourly.src = "img/Sun.png";
            } else if(weatherType === "Clouds") {
                imageHourly.src = "img/cloudy-day.png";
            } else {
                imageHourly.src = "img/Rain.png";
            }
            // imageHourly.src = getImageForHour(response);
            currentTemp.textContent = tempDisplay.textContent;
            
        })
        .catch(error => {
            console.error("API Request Error:", error);
            holdText.textContent = `Invalid error: ${error}`;
            if (error.message.includes("4")) {
                holdText.textContent = "Zip code not found";
            }
            if(error.message.includes("5")) {
                holdText.textContent = "Our Servers are unable to process this request at this time. We apologize"
            }
        })
    


    let newurl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipVal}&appid=4912fed6ea9f93a8898895be4723a205`;
    let forecast = await axios.get(newurl); 

     
    nextTemp.textContent = Math.round(forecast.data.list[0].main.temp - 273.15) + "°C";

    nextNextTemp.textContent = Math.round(forecast.data.list[1].main.temp - 273.15) + "°C";
    lastTemp.textContent = Math.round(forecast.data.list[2].main.temp - 273.15) + "°C";

    if(forecast.data.list[0].weather[0].main === "Rain"){
        imageNextHourly.src = "img/Rain.png";
    } else if(forecast.data.list[0].weather[0].main === "Clouds"){
        imageNextHourly.src = "img/cloudy-day.png";
    } else{
        imageNextHourly.src = "img/Sun.png"; 
    }

    if(forecast.data.list[1].weather[0].main === "Rain"){
        imageNextNextHourly.src = "img/Rain.png";
    } else if(forecast.data.list[1].weather[0].main === "Clouds"){
        imageNextNextHourly.src = "img/cloudy-day.png";
    } else{
        imageNextNextHourly.src = "img/Sun.png"; 
    }

    if(forecast.data.list[2].weather[0].main === "Rain"){
        imageLastHourly.src = "img/Rain.png";
    } else if(forecast.data.list[2].weather[0].main === "Clouds"){
        imageLastHourly.src = "img/cloudy-day.png";
    } else{
        imageLastHourly.src = "img/Sun.png"; 
    }

    console.log("This is the forecast", forecast);

}

window.addEventListener('DOMContentLoaded', function(){
    loadIn(40502);
}, false);

// Adding ability to call loadIn based on clicking zip code

