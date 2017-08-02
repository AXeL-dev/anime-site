/*----------------------------------------------
	Show full anime script for anime_site.html by AXeL
	Using jquery framework
------------------- ----------------------------*/

/*-------------------------------------------------------------------------
	Je ne fait que changer qlq fonctions du code javscript par défaut içi
---------------------------------------------------------------------------*/

function closeFullMode(childToRemove) {
	// convertion du selecteur js en jquery puis on enleve l'element html
	$(childToRemove).slideUp('slow', function () {
		$(childToRemove).remove();
		$('body').attr('class', 'body_image_style'); // pr changer l'arrière plan en image
		$('#main_div').removeAttr('class');
	});
}

/*-------------------------------------------------------------------------
	Je n'ai pas modifier tt le code javascript pr la fonction ci-dessous
---------------------------------------------------------------------------*/
function showFullAnime(animeName) {
	var animeDiv = document.getElementsByTagName('div'),
		animeDivLength = animeDiv.length,
		animeH1,
		animeImage;
	
	// on cherche dans les balises div si la class == 'anime'
	for (var i = 0 ; i < animeDivLength ; i++) {
		if (animeDiv[i].className == 'anime') {
			animeH1 = animeDiv[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
			// si c'est un élément html 'h1, div, ...' + correspond au nom de l'anime
			if (animeH1.nodeType === 1 && animeH1.innerHTML == animeName) {
				// on clone la balise div complete
				var fullAnime = animeDiv[i].cloneNode(true),
					closeFullAnime,
					plusFullAnime,
					typeAnime;
					//,nomImage;
				fullAnime.className = 'full_anime'; // changement de la class pour appliquer le nv css
				fullAnime.id = ''; // pour enlever l'id anime_image_view si spécifié
				fullAnime.style.display = 'inline-block'; // si jamais les animes sont cachés
				// on change le chemin de l'image
				animeImage = fullAnime.firstChild.nextSibling;
				// on s'assure que anime_content n'est pas en display: none; suite au passage en imageView
				animeImage.nextSibling.nextSibling.style.display = 'inline-block';
				// création du bouton fermer
				closeFullAnime = createCloseButton();
				closeFullAnime.onclick = function () { closeFullMode(fullAnime); };
				// ajout du bouton fermer
				fullAnime.insertBefore(closeFullAnime, fullAnime.firstChild);
				// création du lien hypertexte '+..'
				plusFullAnime = document.createElement('a');
				typeAnime = animeDiv[i].parentNode.id;
				plusFullAnime.href = '#' + typeAnime;
				plusFullAnime.innerHTML = "+ d'anime : " + firstLetterToUpperCase(typeAnime);
				plusFullAnime.className = 'plus_full_anime';
				plusFullAnime.onclick = function () {
					closeFullMode(fullAnime);
					scrollToId(typeAnime);
					return false; // pour ignorer les actions par défauts du lien hyper text
				};
				// ajout du lien hypertexte
				fullAnime.appendChild(plusFullAnime);
				// ajout du clone a la fin de body (le seul code jquery ds cette fonction)
				$('body').append(fullAnime);
				$(fullAnime).css('opacity', 0.1).fadeTo('fast', 1); // animation affichage doux
				// changement de la couleur et transparence, et désactivation des evenements
				disableBodyAndMainDiv();
				return;
			}
		}
	}
}
