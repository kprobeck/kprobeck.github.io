"use strict";

var index = 0;
var captions = ["inDICEsion","Adapterra","Rocket Jump"];
var images = ["images/boxart_indicecision.jpg", "images/ADAPTERRA.png","images/rocketjump3_frontPage.png"];  

var image1 = '<img src="images/boxart_indicecision.jpg" alt="inDICEsion">';

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
				e.preventDefault();
			});
			
			$("#previous").on("click",function(e)
			{
				index--;
				
				if(index < 0){ index = images.length - 1;}
				
				showImage();
				e.preventDefault();
			});
			
			$("#description").hover(function(e)
			{
				$(this).css('cursor', 'pointer');
			}, function() 
			{
				$(this).css('cursor', 'auto');
			});
			
			$("#flipbox1").hover(function(e)
			{
				$(this).css('cursor', 'pointer');
			}, function() 
			{
				$(this).css('cursor', 'auto');
			});
			
			$("#description").on("click",function(e)
			{
				if(index == 0){window.location.href = 'https://kprobeck.github.io/project3.html';}
				if(index == 1){window.location.href = 'https://kprobeck.github.io/project1.html';}
				if(index == 2){window.location.href = 'https://kprobeck.github.io/project2.html';}
			});
			
			$("#flipbox1").on("click",function(e)
			{
				index++;
				
				if(index >= images.length){ index = 0;}
				
				showImage();
				e.preventDefault();
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
