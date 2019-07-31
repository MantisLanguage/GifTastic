// array for foods/buttons
var foods = ["Pizza", "Steak", "Ice Cream", "Cheeseburger", "Tacos", "Sushi", "Bacon", "Gyros", "Chicken", "Cheese"];

function makeButtons(){ 
	// repeat blocker
	$('#buttonHouse').empty();
	// for loop for foods array
	for (var i = 0; i < foods.length; i++){
	// establishing foodButton, properities and appending 
		var foodButton = $('<button>') 
		foodButton.addClass('food'); 
		foodButton.attr('data-name', foods[i]); 
		foodButton.text(foods[i]); 
		$('#buttonHouse').append(foodButton); 
	}
}

$("#addFood").on("click", function(){

	// user input of food
	var food = $("#foodInput").val().trim();
	// that input is now added to the array
	foods.push(food);
	makeButtons();
	// turns function into on click or enter key
	return false; 
})

// function to display gifs
function displayGifs(){
	var foodz = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodz + "&api_key=bzyI6eCqz7WTnBy3zHIdN2CdGlnxd5Gd&limit=10";

		// might need to remove spacing
		$.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function (response) {
           
			// setting results variable
			var results = response.data;
            // for loop for gif variables
            
            
			for (var i = 0; i < results.length; i++) {
                var p = $("<p>").text("Rating: " + results[i].rating);
				var gifDiv = $('<div class=gifBox>');
				var foodGif = $('<img>');
					foodGif.attr('src', results[i].images.fixed_height_still.url);
					foodGif.attr('title', "Rating: " + results[i].rating);
					foodGif.attr('data-still', results[i].images.fixed_height_still.url);
                    // setting gifs to still mode to be clicked on later
                    foodGif.attr('data-state', 'still');
					foodGif.addClass('gif');
					foodGif.attr('data-animate', results[i].images.fixed_height.url);
			
				gifDiv.append(foodGif)
                gifDiv.append(p)

				$("#gifSection").prepend(gifDiv);
			}
			 // testing gify functionaltiy
             console.log(response.data);
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".food", displayGifs);

// initially calls the makeButtons function
makeButtons();
