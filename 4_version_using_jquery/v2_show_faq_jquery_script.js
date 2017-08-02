/*----------------------------------------------
	Show Faq script for anime_site.html by AXeL
	Using jquery framework
------------------- ----------------------------*/

$(function () {
	/*-------- show-hide-faq --------*/
	var faqTextDiv = $('#faq div'),
		faqTextDivWidth = faqTextDiv.css('width'),
		duration = 800; // en milliseconde

	$('#faq h1').click( function () {
		if (faqTextDiv.css('display') == 'none') // si caché
			// on s'assure que la largeur est a 0 et on l'affiche
			faqTextDiv.css('width', '0px').css('display', 'inline-block').animate({'width' : '+=' + faqTextDivWidth}, duration);
		else
			// si nn on la cache
			faqTextDiv.animate({'width' : '-=' + faqTextDivWidth}, duration, function () { faqTextDiv.css('display', 'none'); });
	});
});
