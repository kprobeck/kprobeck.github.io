"use strict";

var index = 0;
var captions = ["Adapterra Logo","Adapterra Image 1","Adapterra Image 2", "Area Tile Example", "Research Cards"];
var images = ["images/adapterraLogo.png","images/adapterra1.jpg","images/adapterra2.jpg", "images/area_tile_overheat_texture.png", "images/research_cards.png"];  

var adapterra1 = '<img src="images/adapterraLogo.png" alt="Adapterra Logo">';

// setup jQuery's ready function
        $(document).ready(function(){
		
			$("#flipbox1").flippy(
				{
						verso: adapterra1,
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
