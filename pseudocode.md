## Plan to get weather App Finished 

### What to do first? Decide functionality I want to get finished 
I think it would be helpful for me to first decide everything I want to get 
finished with this project. 

After I know exactly what I want to incorporate into the project I can design how I want those features to look and function. 

Once I decide this, I can go back over this design and my plans and make a list of every main function that will be necessary and I can write how I could make and incorporate those functions and functionality 

### What do I want to get done with this project? 

- I Will need a weather app where users are able to input zip code and I can find the city and the relevant weather date 
- I will need to retrieve and handle possible errors to the API 
- I want to have some functionality that occurs while we are waiting for a load in. For this we can just have a spinning wheel that rotates. I can look into the best ways to do this. 
- I need to grab the temperature and then convert it to farhenheit, celsius and Kelvin 
- I have to bring in a unique image based on the temperature (API has icons located in it)
- I need to display error code on page if error occurs 
- Keep reloading page when new zip code is input 
- Design needs to resize based on screen size and ideally be mobile first 
- Want to use JS to render the entire app 
- Allow user to save multiple locations 
- Allow user to move left and right from the page they are on based on locations saved and loaded 
- Allow user to delete a saved location 
- Save current page to local Storage and load into it 
- Show days in advance and show change by hours 
- May try to use weather app as template 
- Get location Data for user (May have to ask for permissions)


### Need to now make template that incorporates all these ideas 

I think I will use the design platform Figma. First off I will design using the template of a phone as well as a macbook, so that I know how screen should look on both screen sizes. I need to design intuitively and with user in mind. 

I am now adding the images of the basic design into an image file. With this I know what I want the final product to look like on both screens. 

### What to do now? 

Now Need to go through and make different versions of project. For first version of project I will have text that will display the name of 
the city. (Done)

For second version, I will have it so that user can input zip code and we can display city name - you put in. I will also institute try and catch to display message. (Done)

For third version, I will display temperature as well on screen. I will also attempt to get the current user location. I will display the addtional displays that I believe are important. Need to import bootstrap. I will also attempt to place container info in a container and then row, column format. (Done)

Move city name lower on the page (Done). (Done), So need to load in some images I could use (Done)  Make light and dark button functionality look like they should (Done). Need to add switch statement that determines image to load (Done). For div I will have temperature be displayed on the far right of the image in the middle and I will have the date be displayed in the top left (For this I will need a date object). (Done)

I will now add the divs to the page that will represent where we hold the Left and right button divs. I will programmatically add this to the page. (Done) 

I will now add an overlay. 

This will be a large step. For this one I will have an array and when adding a new value it will be pushed to the array. (Done) If there is already a value of this in the array we will not push this to the array (done), we will simply go to this in the array (done). 

If there are values in the array we will make the left and right buttons appear on the screen (Done). We will save the array to memory (Done).

We will also iterate through the array on presses to go to the next index in the array. We will loop around if you are at the end of the index array or if you are at the start of it. (Done)

Need to add delete button (Done). If the delete button is pressed we will delete this instance from the array. When button is pressed we will set currentValue and call (Done)

Now will add overlay to make image and all text look better. Need to add darkening effect to holdImgDiv to make everything appear more clearly (Done)

Add in all wind, pressure and humidity values (Done)

Need to add in outline and designs for hourly forecase (Next four hours) 

Need to use conditions to decide what to add at each time interval (for Every three hours). Some I should have (Clear sky, Clouds, Rain)