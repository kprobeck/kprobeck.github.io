"use strict";

var index = 0;
var captions = ["Adapterra","Rocket Jump","Unity Park Ride"];
var images = ["images/adapterraLogo.png","images/rocketjump3_frontPage.png","images/alienShip1_frontPage.png"];  

var image1 = '<img src="images/adapterraLogo.png" alt="Adapterra">';

// setup jQuery's ready function
        $(document).ready(function(){
		
			$("#flipbox1").flippy(
				{
						verso: image1,
						depth: 1
				}
			);
			
			$("#next").on("click",function(e)
			{
				index++;
				
				if(index >= images.length){ index = 0;}
				
				showImage();
			});
			
			$("#previous").on("click",function(e)
			{
				index--;
				
				if(index < 0){ index = images.length - 1;}
				
				showImage();
			});
		
		});
		
		
		// showImage
		function showImage(){
			var img = document.createElement("img");
			var caption = captions[index];
			
			img.src = images[index];
			img.setAttribute("alt", caption);
			
			img.onload = function()
			{
				$("#description").text(caption);
				
				$("#flipbox1").flippy
				({
					verso: img,
					depth: 1
				});
			};
		}
