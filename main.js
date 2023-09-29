localStorage.clear();

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

// Function for newArrow that will allow for moving between values 

// async function moveLeft(){
    
//     // You are currently on the leftMost value, go to rightmost val 
//     if(currentValue === arrayOfValues[0]){
//         await loadIn(arrayOfValues[arrayOfValues.length - 1]);
//     } else {
        
//         for(let i = 0; i < arrayOfValues.length; i++){
//             if(arrayOfValues[i] === currentValue){
//                 currentIndex = i;
//             }
//         }

//         await loadIn(arrayOfValues[currentIndex - 1]);
        
//     }

//     // Need to move through array and textValue of array
// }

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

holdButtons.classList.add("d-flex", "justify-content-between", "align-items-center", "col-12", "vw-75", "bg-success", "p-3");


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


// Useful for getting zip
let apiKey = "77abea49302d916cfd2aab05e9372441";
let urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=42167&appid=" + apiKey;

// Will pass in value to this that will be looked up
async function loadIn(zipVal){

    // Will return passed in val
    urlVal = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipVal + "&appid=" + apiKey;

    console.log("API Request URL:", urlVal);
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

            // Check if raining. If raining add rain image "https://api.openweathermap.org/data/2.5/weather?zip=40502&appid=77abea49302d916cfd2aab05e9372441"
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
    


    // console.log(dataDisplay);

}

window.addEventListener('DOMContentLoaded', function(){
    loadIn(40502);
}, false);

// Adding ability to call loadIn based on clicking zip code

