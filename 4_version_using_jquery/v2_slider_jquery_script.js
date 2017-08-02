/*----------------------------------------------
	Slider script for anime_site.html by AXeL
	Using jquery framework
------------------- ----------------------------*/

$(function () {
	/*-------- next-prev slider --------*/
	var sliderUl = $('#image_slider'),
		imageNumber = sliderUl.children().length,
    	imageWidth = parseInt($('#image_slider li:first-child').css('width')), // taille d'une image
    	currentImage = 1, // première image (celle du début)
		duration = 1000, // durée du glissage
		timerDelay = 3000, // 3 secondes
		timerID;

	// initialisation de la longueur de la liste d'images d'abord
	sliderUl.css('width', imageWidth * imageNumber);
	
	// gestion des click sur les bouttons de navigation
    $('#prev').click( function () {
		clearInterval(timerID); // désactivation du slide automatique
    	if (currentImage > 1) { // si ce n'est pas la première image
        	sliderUl.animate({'left' : '+=' + imageWidth}, duration); // on peut revenir en arrière
			currentImage--;
        }
        else { // si nn
			sliderUl.animate({'left' : '-=' + imageWidth * (imageNumber - 1)}, duration); // on va à la dernière image
			currentImage = imageNumber;
        }
		activateAutoSlide(); // activation du slide automatique
	});
	
	$('#next').click( function () {
		clearInterval(timerID); // désactivation du slide automatique
		if (currentImage < imageNumber) { // si ce n'est pas la dernière
        	sliderUl.animate({'left' : '-=' + imageWidth}, duration); // on peut avancer
			currentImage++;
        }
        else { // si nn
			sliderUl.animate({'left' : '+=' + imageWidth * (imageNumber - 1)}, duration); // on va à la première image
			currentImage = 1;
        }
		activateAutoSlide(); // activation du slide automatique
	});
	
	// slide automatique
	function activateAutoSlide() {
		timerID = setInterval(function () { $('#next').click(); }, timerDelay);
	}
	activateAutoSlide(); // activation du slide automatique
});
