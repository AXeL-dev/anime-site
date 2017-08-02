/* Default script for anime_site.html by AXeL */

/*-------- next-prev slider --------*/
// variables globales
var ul,
	liItems,
	imageNumber,
	imageWidth,
	prev,
	next,
	currentPosition = 0,
	currentImage = 0,
	timerID,
	timerDelay = 10000; // 10 secondes
	
function initSlider() {
	ul = document.getElementById('image_slider');
	liItems = ul.children;
	imageNumber = liItems.length;
	imageWidth = liItems[0].children[0].clientWidth;
	ul.style.width = parseInt(imageWidth * imageNumber) + 'px'; // largeur totale de la liste
	prev = document.getElementById('prev');
	next = document.getElementById('next');
	prev.onclick = function(){ clearTimeout(timerID); onClickPrev(); timerID = setTimeout(autoAnimate, timerDelay); };
	next.onclick = function(){ clearTimeout(timerID); onClickNext(); timerID = setTimeout(autoAnimate, timerDelay); };
	timerID = setTimeout(autoAnimate, timerDelay); // on attend x secondes avant de lancer l'auto-animation
}

function autoAnimate() {
	onClickNext();
	timerID = setTimeout(autoAnimate, timerDelay); // répétition automatique chaque x secondes
}

function animate(opts) {
	var start = new Date, // on récupère la date
		id = setInterval(function() { // window.setInterval sert a repeter un traitement js à intervalle régulier
				var timePassed = new Date - start,
				progress = timePassed / opts.duration;
				//alert('timePassed : ' + timePassed + '\nprogress : ' + progress);
				if (progress > 1) {
					progress = 1; // pour ne pas dépasser une seconde
				}
				
				var delta = opts.delta(progress);
				//alert('delta : ' + delta + '\nprogress : ' + progress);
				opts.step(delta); // lancement de l'animation
				if (progress == 1) { // si une seconde fini, on arrete la repetition de l'animation
					clearInterval(id);
					opts.callback();
				}
			},
			opts.delay || 17); // on repete chaque 17 millisecondes (car opts.delay n'est pas défini)
		//return id;
}

function slideTo(imageToGo) {
	var direction,
		numOfImageToGo = Math.abs(imageToGo - currentImage); // valeur absolu pour éviter les valeurs négatives
	
	direction = currentImage > imageToGo ? 1 : -1; // direction de glissage (1 => à droite, -1 => à gauche)
	currentPosition = -1 * currentImage * imageWidth; // la position de la 1ere image sera 0 (-1*0*575) et de la 2eme sera -575 (-1*1*575), ...
	//alert('direction : ' + direction + '\ncurrentImage : ' + currentImage + '\nimageToGo : ' + imageToGo + '\nimageWidth : ' + imageWidth + '\ncurrentPosition : ' + currentPosition + '\nnumOfImageToGo : ' + numOfImageToGo);
	var opts = { // création d'objet
		duration:1000, // durée du glissage
		delta:function(p) { return p; },
		step:function(delta) { // delat !== la propriété delta juste en haut
				ul.style.left = parseInt(currentPosition + direction * delta * imageWidth * numOfImageToGo) + 'px'; // pour changer la position gauche de la liste (afin d'afficher les autres images)
				//alert('ul.left : ' + ul.style.left);
			},
		callback:function() { currentImage = imageToGo; } // pour changer l'index de l'image actuel
	};
	animate(opts);
}

function onClickPrev() {
	if (currentImage == 0) {
		slideTo(imageNumber - 2); // -2 car on a 2 images dans chaque block du slider
	}
	else {
		slideTo(currentImage - 1);
	}
}

function onClickNext() {
	if (currentImage == imageNumber - 2) {
		slideTo(0);
	}
	else {
		slideTo(currentImage + 1);
	}
}

/*-------- show-full-anime --------*/
function firstLetterToUpperCase(chaine) { // fonction qui met les premières lettres d'une chaine en majuscule
	var chaineLength = chaine.length, nvChaine = '';
	for (var i = 0; i < chaineLength; i++) {
		if (i === 0 || chaine[i-1] === ' ' || chaine[i-1] === '-' || chaine[i-1] === '_' || chaine[i-1] === ';')
			nvChaine += chaine[i].toUpperCase();
		else
		{
			if (chaine[i] === '_') // si underscore, on le remplace par un espace
				nvChaine += ' ';
			else
				nvChaine += chaine[i];
		}
	}
	
	return nvChaine;
}

function closeFullMode(childToRemove) {
	document.body.removeChild(childToRemove);
	document.body.style.background = '#dddddd';
	document.getElementById('main_div').className = '';
}

function disableBodyAndMainDiv() {
	document.body.style.background = '#161616';
	document.getElementById('main_div').className = 'disable_all';
}

function createCloseButton() {
	var closeButton = document.createElement('input');
	closeButton.type = 'button';
	//closeButton.value = 'x';
	closeButton.className = 'close_full_anime';
	return closeButton;
}

function showHideAnime(firstAnimeDiv, showHideBtn) {
	var animeDisplay, animeDiv = firstAnimeDiv;
	
	if (firstAnimeDiv.style.display == 'none') { // si les animes sont cachés on les affiche si nn on les cache
		animeDisplay = 'inline-block';
		showHideBtn.id = 'show_anime'; // pour appliquer le css de l'id show_anime
	}
	else {
		animeDisplay = 'none';
		showHideBtn.id = 'hide_anime';
	}
	
	while (animeDiv) { // || != 'undefined'
		animeDiv.style.display = animeDisplay;
		animeDiv = animeDiv.nextSibling.nextSibling; // pour parcourir tout les animes
	}
}

function showFullAnime(animeName) {
	var animeDiv = document.getElementsByTagName('div'),
		animeDivLength = animeDiv.length,
		animeH1,
		animeImage;
	
	// on cherche dans les balises div dans la class == 'anime'
	for (var i = 0 ; i < animeDivLength ; i++) {
		if (animeDiv[i].className == 'anime') {
			animeH1 = animeDiv[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
			// si c'est un élément html 'h1, div, ...' + correspond au nom de l'anime
			if (animeH1.nodeType === 1 && animeH1.innerHTML == animeName) {
				// on clone la balise div complete
				var fullAnime = animeDiv[i].cloneNode(true),
					closeFullAnime,
					plusFullAnime,
					typeAnime,
					nomImage;
				fullAnime.className = 'full_anime'; // changement de la class pour appliquer le nv css
				fullAnime.id = ''; // pour enlever l'id anime_image_view si spécifié
				fullAnime.style.display = 'inline-block'; // si jamais les animes sont cachés
				// on change le chemin de l'image
				animeImage = fullAnime.firstChild.nextSibling;
				nomImage = animeImage.src.substring(animeImage.src.lastIndexOf('/') + 1);
				animeImage.src = 'rsc/images/' + nomImage;
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
				// ajout du clone a la fin de body
				document.body.appendChild(fullAnime);
				// changement de la couleur et transparence, et désactivation des evenements
				disableBodyAndMainDiv();
				return;
			}
		}
	}
}

function initAnime() {
	var animes = document.getElementsByTagName('h1'), animesLength = animes.length;
	
	// traitement des clics sur les titres d'anime
	for (var i = 0; i < animesLength; i++) {
		if (animes[i].className == 'anime_title')
			animes[i].onclick = function () { showFullAnime(this.innerHTML); };
	}
	
	animes = document.getElementsByTagName('img'); // on récupère toute les balises img
	animesLength = animes.length;
	
	// traitement des clics sur les images d'anime
	for (var i = 0; i < animesLength; i++) {
		if (animes[i].className == 'anime_image') // si c'est une image inclus dans une balise div 'anime'
			animes[i].onclick = function () { showFullAnime(this.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerHTML); }; //on parcours les balises a partir de l'image jusqu'au span du titre
		else if (animes[i].alt) // si nn si c'est une image d'anime qui a la propriété alt définie
			animes[i].onclick = function () { showFullAnime(this.alt); };
	}
	
	// traitement des clics sur le bouton show_hide_anime
	var inputs = document.getElementsByTagName('input'), inputsLength = inputs.length;
	
	for (var i = 0; i < inputsLength; i++) {
		if (inputs[i].className == 'show_hide_anime')
			inputs[i].onclick = function () { showHideAnime(this.parentNode.nextSibling.nextSibling, this); };
	}
}

/*-------- classement-par-nom --------*/
function initClassement() {
	var ol = document.getElementById('classement_par_nom').firstChild.nextSibling.nextSibling.nextSibling,
		li = ol.children,
		liNumber = li.length;
		
	for (var i = 0; i < liNumber; i++) {
		li[i].onmouseover = function () { this.firstChild.nextSibling.style.display = 'block'; }; // sourie dessus => on affiche les images
		li[i].onmouseout = function () { this.firstChild.nextSibling.style.display = 'none'; }; // sourie ailleur => on cache les images
	}
}

/*-------- full-anime-trailer --------*/
function showFullTrailer(animeTrailerSpan) {
	if (animeTrailerSpan.className == 'anime_trailer') { // on vérifie bien que c'est un trailer
		// on clone la balise span complete
		var fullTrailer = animeTrailerSpan.cloneNode(true),
			closeFullTrailer,
			fullTrailerVideo = fullTrailer.firstChild.nextSibling.nextSibling.nextSibling;
		fullTrailer.className = 'full_trailer'; // changement de la class pour appliquer le nv css
		// création du bouton fermer
		closeFullTrailer = createCloseButton();
		closeFullTrailer.onclick = function () { fullTrailerVideo.pause(); closeFullMode(fullTrailer); }; // on stop la vidéo et on remet tout en ordre
		// ajout du bouton fermer avant la vidéo
		fullTrailer.insertBefore(closeFullTrailer, fullTrailerVideo);
		// changement de la taille de la vidéo
		fullTrailerVideo.width = '848';
		fullTrailerVideo.height = '480';
		// ajout du clone a la fin de body
		document.body.appendChild(fullTrailer);
		// changement de la couleur et transparence, et désactivation des evenements
		disableBodyAndMainDiv();
		// lancement de la vidéo
		fullTrailerVideo.play();
		return;
	}
	else
		return;
}

function initTrailer() {
	var videos = document.getElementsByTagName('video'),
		videosLength = videos.length;
	
	for (var i = 0; i < videosLength; i++) {
		videos[i].onclick = function () { showFullTrailer(this.parentNode); return false; }; // on affiche le trailer en plus grande taille et on bloque la lecture du petit trailer
		//videos[i].onplay = function () { /*this.pause();*/ this.load(); }; // on empeche/arrete la lecture du petit trailer (petite video)
	}
}

/*-------- show-hide-faq --------*/
function showHideFaq(faqHeaderDiv) {
	var faqTextDiv = faqHeaderDiv.nextSibling.nextSibling;
	
	if (faqTextDiv.style.display == 'none')
		faqTextDiv.style.display = 'inline-block';
	else
		faqTextDiv.style.display = 'none';
}

function initFaq() {
	var faqDiv = document.getElementById('faq'),
		faqHeaderDiv = faqDiv.firstChild.nextSibling;
	
	faqHeaderDiv.onclick = function () { showHideFaq(this); };
}

/*--------- view ---------*/
function changeView(view, viewLength, currentView) {
	for (var i = 0; i < viewLength; i++) {
		view[i].id = ''; // on enlève les id
	}
	
	currentView.id = 'default_view'; // pour appliquer le css du default_view
	
	var allDiv = document.getElementsByTagName('div'),
		allDivLength = allDiv.length,
		currentViewClass = currentView.className;
	
	for (var i = 0; i < allDivLength; i++) {
		if (allDiv[i].className == 'anime') { // si div class => anime
			var animeContentDiv = allDiv[i].firstChild.nextSibling.nextSibling.nextSibling;
			if (currentViewClass == 'imageView') { // si imageView choisi
				animeContentDiv.style.display = 'none';
				allDiv[i].id = 'anime_image_view';
				//allDiv[i].style.width = 'auto';
				//allDiv[i].style.margin = '0 20px 0 0'; // margin-right: 20px;
			}
			else {
				animeContentDiv.style.display = 'inline-block';
				allDiv[i].id = '';
				//allDiv[i].style.width = '555px';
				//allDiv[i].style.margin = '0 0 20px 0'; // margin-bottom: 20px;
			}
		}
	}
}

function initView() {
	var ul = document.getElementsByTagName('ul'), ulLength = ul.length;
	
	for (var i = 0; i < ulLength; i++) {
		if (ul[i].className == 'view') {
			var view = ul[i].children, viewLength = view.length;
			for (var j = 0; j < viewLength; j++) {
				view[j].onclick = function () { changeView(view, viewLength, this); };
			}
			return;
		}
	}
}

/*-------- scroll --------*/
function verticalScrollTo(yStopPosition, scrollDuration) { // fonction de défilement vertical (version bêta)
	var scrollRepeatTime = 15, // 15 millisecondes
		scrollStep = (yStopPosition - window.scrollY) / (scrollDuration / scrollRepeatTime),
		scrollInterval,
		currentPosition = window.scrollY;
	
	//alert('yStopPosition : ' + yStopPosition + '\nwindow.scrollY : ' + window.scrollY + '\nscrollStep : ' + scrollStep + '\nscrollDuration / scrollRepeatTime : ' + scrollDuration / scrollRepeatTime);
    
    scrollInterval = setInterval(function() {
    	if (Math.round(currentPosition) != yStopPosition) { // on majore le nombre puis on teste s'il est différent ou égal à la position d'arrêt
    		window.scrollBy(0, scrollStep);
    		currentPosition += scrollStep;
    	}
    	else {
    		//alert('window.scrollY : ' + window.scrollY + '\ncurrentPosition : ' + currentPosition + '\ncurrentPositionRound : ' + Math.round(currentPosition) + '\nscrollStep : ' + scrollStep + '\nunScrolled : ' + (yStopPosition - window.scrollY));
    		window.scrollBy(0, yStopPosition - window.scrollY); // on défile le reste (s'il y'en n'a pas, aucun soucis)
    		clearInterval(scrollInterval);
    	}
    }, scrollRepeatTime); // on répéte chaque 15 ms tant qu'on a pas dépasser la durée (scrollDuration)
}

function initScroll() {
	initScrollUp();
	initScrollToId();
}

/*-------- scroll-up --------*/
function initScrollUp() {
	var scrollUp = document.getElementById('scroll_up');
	
	scrollUp.onclick = function () { verticalScrollTo(0, 600); return false; }; // return false; car la fonction verticalScrollTo() fera l'affaire pas besoin de l'ancre #
	
	onscroll = function () { // ou window.onscroll
		if (window.scrollY > 100) // si position y du défilement vertical > 100 on affiche le bouton de défilement vers le haut si nn on le cache
			scrollUp.style.display = 'block';
		else
			scrollUp.style.display = 'none';
	};
}

/*-------- scroll-to-id --------*/
function scrollToId(id) {
	var IdDiv = document.getElementById(id),
		position = IdDiv.getBoundingClientRect(); // on récupère la position de la balise
	//alert(position.top);
	verticalScrollTo(Math.round(position.top) + window.scrollY, 600); // on majore la position.top (car c'est un nbr flottant) et on ajoute la position de la fenêtre par rapport à la barre de défilement verticale
}

function initScrollToId() {
	var liens = document.getElementsByTagName('a'),
		liensLength = liens.length,
		id;
	
	for (var i = 0; i < liensLength; i++) {
		id = liens[i].href.substring(liens[i].href.indexOf('#') + 1); // on extrait l'id du lien
		if (id && id.length < liens[i].href.length) { // si l'id n'est pas vide + inférieur à la longueur du lien
			//alert(id);
			liens[i].onclick = function () { scrollToId(this.href.substring(this.href.indexOf('#') + 1)); return false; }; // alors c'est un lien vers un id
		}
	}
}

/*-------- top-anime --------*/
function animateTopAnime(ul, pagerChild, pagerChildLength, currentPagerChild) {
	var currentPosition,
		positionToGo,
		ulTopPosition,
		direction,
		numOfPageToGo;
	
	for (var i = 0; i < pagerChildLength; i++) {
		if (pagerChild[i].id == 'default_pager') // on cherche la position actuelle
			currentPosition = i;
		else if (pagerChild[i] == currentPagerChild) // et la position ou on veux aller
			positionToGo = i;
		pagerChild[i].id = ''; // on enlève les id
	}
	
	currentPagerChild.id = 'default_pager'; // on applique le css à la page actuelle
	
	ulTopPosition = -1 * currentPosition * 200; // 200px c'est la hauteur du slider (topAnime)
	direction = currentPosition > positionToGo ? 1 : -1; // direction de glissage (1 => en haut, -1 => en bas)
	numOfPageToGo = Math.abs(positionToGo - currentPosition); // nombre de page a parcourir
	//alert(numOfPageToGo);
	
	var opts = { // création d'objet
		duration:1000, // durée du glissage
		delta:function(p) { return p; },
		step:function(delta) {
				ul.style.top = ulTopPosition+direction*delta*200*numOfPageToGo + 'px'; // on glisse la liste verticalement
			},
		callback:function() { /*alert(ul.style.top);*/ } // on ne fera rien du tt pas besoin
	};
	animate(opts); // on commence l'animation
}

function initTopAnime() {
	var pager = document.getElementById('default_pager').parentNode,
		pagerChild = pager.children,
		pagerChildLength = pagerChild.length,
		topAnimeSlider = pager.nextSibling.nextSibling,
		ul = topAnimeSlider.firstChild.nextSibling;
	
	for (var i = 0; i < pagerChildLength; i++) {
		pagerChild[i].onclick = function () { animateTopAnime(ul, pagerChild, pagerChildLength, this); };
	}
}

/*--------- jeu-de-devinette --------*/
function randomNumber(rMin, rMax) { // fonction qui génère un nombre aléatoire entre rMin et rMax (@! si rMin > 0 => rMax doit être = à rMax - 1)
	var rNumber = Math.floor((Math.random() * rMax) + rMin);
	return rNumber;
}

function initJeu() {
	var jeuDiv = document.getElementById('jeu_de_devinette').firstChild.nextSibling.nextSibling.nextSibling,
		jeuImageNumber = 16,
		jeuDivChild,
		animesTitle = document.getElementsByTagName('h1'),
		animesTitleLength = animesTitle.length,
		animeImage,
		selectedImage = -1; // valeur -1 juste pour initialiser
	
	// on initialise les images du jeu aléatoirement
	for (var i = 0; i < jeuImageNumber; i++) {
		var j = randomNumber(0, animesTitleLength); // on genère un nombre aléatoire entre 0 et animesTitleLength
		animeImage = animesTitle[j].parentNode.previousSibling.previousSibling; // on parcourt les balises jusqu'a trouver l'image
		if (animeImage && animeImage.className == 'anime_image') { // si c'est vraiment l'image d'un anime
			
			jeuDivChild = jeuDiv.children; // on récupère les images déjà ajoutée
			var addImage = true;
			
			for (var k = 0; k < jeuDivChild.length; k++) { // on vérifie que l'image n'est pas répétée
				if (jeuDivChild[k].alt == animesTitle[j].innerHTML) { // si image répétée
					i--;
					addImage = false;
					break; // on sort de cette boucle
				}
			}
			
			if (addImage) { // si image non répétée
				animeImage = animeImage.cloneNode(false); // on clône l'image
				animeImage.alt = animesTitle[j].innerHTML; // ajout du nom de l'anime (alt au lieu de title car title s'affiche onmouseover)
				jeuDiv.appendChild(animeImage); // on ajoute l'image
			}
		}
		else
			i--; // car on n'a rien ajouter
	}
	
	// boutton refresh/raffraîchir
	var refreshBtn = document.getElementById('jeu_refresh_btn'),
		lastSelectedImage;
	
	jeuDivChild = jeuDiv.children; // on récupère toutes les images ajoutées
	
	refreshBtn.onclick = function () {
		for(var i = 0; i < jeuImageNumber; i++) {
			jeuDivChild[i].id = ''; // on enlève les id
		}
		lastSelectedImage = selectedImage;
		while (selectedImage == lastSelectedImage) { // on génère un nombre aléatoire différent du dernier qu'on a piocher :p
			selectedImage = randomNumber(0, jeuImageNumber);
		}
		jeuDivChild[selectedImage].id = 'selected_anime_image'; // on applique le css
	};
	
	// boutton j'ai deviné!/submit_btn
	var submitBtn = document.getElementById('jeu_submit_btn'),
		userTitle = document.getElementById('jeu_text'),
		trueAnswers = 0,
		trueAnswersSpan = document.getElementById('true_answers'),
		falseAnswers = 0,
		falseAnswersSpan = document.getElementById('false_answers');
	
	submitBtn.onclick = function () {
		if (userTitle.value.toUpperCase() == jeuDivChild[selectedImage].alt.toUpperCase()) { // si réponse correcte
			userTitle.style.border = '1px solid #44bf44'; // bordure verte
			trueAnswers++;
			trueAnswersSpan.innerHTML = trueAnswers + (trueAnswers > 1 ? ' réponses correctes' : ' réponse correcte');
			alert('bravo !');
			userTitle.value = ''; // on vide la zone de saisie
			userTitle.style.border = '1px solid #dddddd'; // on remet la bordure
			userTitle.focus();
			refreshBtn.onclick(); // on séléctionne une nouvelle image
		}
		else {
			userTitle.style.border = '1px solid #e74c3c';
			falseAnswers++;
			falseAnswersSpan.innerHTML = falseAnswers + (falseAnswers > 1 ? ' réponses incorrectes' : ' réponse incorrecte');
			//alert('pas de chance...');
		}
	};
	
	// zone de saisie
	userTitle.onkeyup = function () {
		if (userTitle.style.border != '1px solid #dddddd') // si une autre bordure est appliquée
			userTitle.style.border = '1px solid #dddddd'; // on remet la bordure initiale
	};
	
	refreshBtn.onclick(); // pour séléctionner une image au début
}

/*-------- init-all --------*/
function initAll() {
	initSlider();
	initView();
	initAnime();
	initFaq();
	initTrailer();
	initScroll();
	initTopAnime();
	initClassement();
	initJeu();
}

window.onload = initAll;
