/* Default script for anime_site.html by AXeL */

/*-------- show-full-anime --------*/
/*------------------------------------------------------------------------
	J'ai enlever qlq fonctions d'içi et je les ai réecrit en jquery (dans un autre fichier)
-------------------------------------------------------------------------*/
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

function disableBodyAndMainDiv() {
	document.body.className = 'body_disabled_style';		
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
	
	//alert(firstAnimeDiv.style.display);
	if (firstAnimeDiv.style.display == 'none') { // si les animes sont cachés on les affiche si nn on les cache
		animeDisplay = 'inline-block';
		showHideBtn.className = 'show_hide_anime show_anime'; // pour appliquer le css de la class show_anime
	}
	else {
		animeDisplay = 'none';
		showHideBtn.className = 'show_hide_anime hide_anime';
	}
	
	while (animeDiv) { // || != 'undefined'
		animeDiv.style.display = animeDisplay;
		animeDiv = animeDiv.nextSibling.nextSibling; // pour parcourir tout les animes
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
		if (inputs[i].className.indexOf('show_hide_anime') != -1)
			inputs[i].onclick = function () { showHideAnime(this.parentNode.nextSibling.nextSibling, this); };
	}
}

/*-------- classement-par-nom --------*/
function initClassement() {
	var ol = document.getElementById('classement').firstChild.nextSibling.nextSibling.nextSibling,
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
		// l'évennement onplay se déclenche sous chrome seulement lors d'un clic sur le boutton play du coup on va appeler l'even. click juste après
		videos[i].onplay = function () { /*alert('event'); this.pause();*/ this.load(); this.click(); }; // on empeche/arrete la lecture du petit trailer (petite video) et on lance le fullTrailer
	}
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
			}
			else {
				animeContentDiv.style.display = 'inline-block';
				allDiv[i].id = '';
			}
		}
	}
}

function slowDisplay(divToDisplay, opacityDegree, delay) {
	//alert(opacityDegree);
	divToDisplay.style.opacity = opacityDegree;
	
	if (opacityDegree < 0.9) {
		opacityDegree += 0.1;
		setTimeout(function () { slowDisplay(divToDisplay, opacityDegree, delay); }, delay);
	}
}

function initView() {
	var ul = document.getElementsByTagName('ul'), ulLength = ul.length,
		bodyWrapperDiv = document.getElementById('body_wrapper');
	
	for (var i = 0; i < ulLength; i++) {
		if (ul[i].className == 'view') {
			var view = ul[i].children, viewLength = view.length;
			for (var j = 0; j < viewLength; j++) {
				view[j].onclick = function () {
					if (this.id != 'default_view') { // si ce n'est pas la vue actuellement séléctionné (qui a le css 'default_view')
						changeView(view, viewLength, this);
						slowDisplay(bodyWrapperDiv, 0.1, 60); // 0.1 => opacity/transparence de début, 60 => millisecondes
					}
				};
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
		if (window.scrollY > 300) // si position y du défilement vertical > 300 on affiche le bouton de défilement vers le haut si nn on le cache
			scrollUp.style.display = 'block';
		else
			scrollUp.style.display = 'none';
	};
	//onscroll(); //pour éviter que le bouton de défilement en haut ne soit pas cacher si raffraîchissement de la page
}

/*-------- scroll-to-id --------*/
function scrollToId(id) {
	var IdDiv = document.getElementById(id),
		position = IdDiv.getBoundingClientRect(); // on récupère la position de la balise
	//alert(position.top);
	verticalScrollTo(Math.round(position.top) + window.scrollY, 600); // on majore la position.top (car c'est un nbr flottant) et on ajoute la position de la fenêtre par rapport à la barre de défilement verticale
}

function verifAccent(str) {
	return str.replace('%C3%A9', 'é'); // si un e accent (é) mal encodé on le remplace par un e accent
}

function initScrollToId() {
	var liens = document.getElementsByTagName('a'),
		liensLength = liens.length,
		id;
	
	for (var i = 0; i < liensLength; i++) {
		id = liens[i].href.substring(liens[i].href.indexOf('#') + 1); // on extrait l'id du lien
		if (id && id.length < liens[i].href.length) { // si l'id n'est pas vide + inférieur à la longueur du lien
			//alert(id);
			liens[i].onclick = function () { scrollToId(verifAccent(this.href.substring(this.href.indexOf('#') + 1))); return false; }; // alors c'est un lien vers un id
			// changement des icones de la nav_var lors d'un focus(mouseover/mouseout)
			if (liens[i].firstChild.tagName == 'IMG') { // si c'est un lien qui contient une image
				liens[i].onmouseover = function () {
					var srcImage = this.firstChild.src;
					this.firstChild.src = srcImage.substring(0, srcImage.lastIndexOf('_') + 1) + 'grey.png';
				};
				liens[i].onmouseout = function () {
					var srcImage = this.firstChild.src;
					this.firstChild.src = srcImage.substring(0, srcImage.lastIndexOf('_') + 1) + 'white.png';
				};
			}
		}
	}
}

/*-------- top-anime --------*/
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

function hideOneAndShowOne(elmToHide, elmToHideWidth, elmToShow, elmToShowWidth, maxWidth, step, delay) {
	//alert(elmToShow.style.width);
	if (elmToHide != null) {
		elmToHide.style.width = elmToHideWidth + 'px';
		elmToHideWidth -= step;
		//alert(elmToHide.style.width);
	}
	elmToShow.style.width = elmToShowWidth + 'px';
	elmToShowWidth += step;
	if (elmToShowWidth <= maxWidth)
		setTimeout(function () { hideOneAndShowOne(elmToHide, elmToHideWidth, elmToShow, elmToShowWidth, maxWidth, step, delay); }, delay);
}

function initJeu() {
	var jeuImageList = document.getElementById('jeu_de_devinette').firstChild.nextSibling.nextSibling.nextSibling, // liste qui contiendra les images d'anime aléatoires
		jeuImageNumber = 22,
		animesTitle = document.getElementsByTagName('h1'),
		animesTitleLength = animesTitle.length,
		animeImage,
		animeImageLi,
		jeuImageListChild,
		chargementDeLaPage = true;

	// on initialise les images du jeu aléatoirement
	function randomInit() {
		for (var i = 0; i < jeuImageNumber; i++) {
			var j = randomNumber(0, animesTitleLength); // on genère un nombre aléatoire entre 0 et animesTitleLength
			animeImage = animesTitle[j].parentNode.previousSibling.previousSibling; // on parcourt les balises jusqu'a trouver l'image
			if (animeImage && animeImage.className == 'anime_image') { // si c'est vraiment l'image d'un anime
				jeuImageListChild = jeuImageList.children; // on récupère les images déjà ajoutée
				var addImage = true;
			
				for (var k = 0; k < jeuImageListChild.length; k++) { // on vérifie que l'image n'est pas répétée
					//alert(jeuImageListChild[k].firstChild.alt);
					if (jeuImageListChild[k].firstChild.alt == animesTitle[j].innerHTML) { // si image répétée
						i--;
						addImage = false;
						break; // on sort de cette boucle
					}
				}
			
				if (addImage) { // si image non répétée
					animeImage = animeImage.cloneNode(false); // on clône l'image
					animeImage.alt = animesTitle[j].innerHTML; // ajout du nom de l'anime (alt au lieu de title car title s'affiche onmouseover)
					animeImageLi = document.createElement('li');
					animeImageLi.appendChild(animeImage);
					jeuImageList.appendChild(animeImageLi); // on ajoute l'image
				}
			}
			else
				i--; // car on n'a rien ajouter
		} // fin for
	}

	// boutton next/suivant
	var nextBtn = document.getElementById('jeu_next_btn'),
		jeuScoreBtn = document.getElementById('jeu_score').firstChild.nextSibling.firstChild.nextSibling,
		selectedImage = -1, // valeur -1 juste pour initialiser
		lastSelImageLi = null; // il faut l'initialiser par null car au début on n'a pas d'image séléctionné avant la première image
	
	jeuImageListChild = jeuImageList.children; // on récupère toutes les images ajoutées
	
	nextBtn.onclick = function () {
		if (selectedImage < jeuImageNumber) {
			if (selectedImage != -1) // ou bien 'lastSelImageLi != null'
				lastSelImageLi.firstChild.id = ''; // on enlève l'id (pr enlever le css)
			selectedImage++; // incrémentation (on passe à l'image suivante)
			if (selectedImage < jeuImageNumber) {
				//alert(selectedImage);
				var currentSelImageLi = jeuImageListChild[selectedImage];
				currentSelImageLi.firstChild.id = 'selected_anime_image'; // on applique le css
				hideOneAndShowOne(lastSelImageLi, 240, currentSelImageLi, 40, 240, 20, 25); // last 240 => maxWidth, 20 => step, 25 => delay
				lastSelImageLi = currentSelImageLi;
			}
			if (!chargementDeLaPage) { // si la page n'est pas entrain de se charger (démarrage)
				userTitle.value = ''; // on vide la zone de saisie
				userTitle.focus();
			}
			//alert(jeuScoreBtn);
			if (selectedImage == jeuImageNumber) {
				if (jeuScoreBtn.className.indexOf('show_anime') == -1) // si score caché (je n'ai pas recherché l'index de 'hide_anime' car la 1ère class 'show_hide_anime' contient déjà cette chaine)
					jeuScoreBtn.click();
				nextBtn.disabled = true;
				submitBtn.disabled = true;
			}
		}
	};
	
	// boutton j'ai deviné!/submit_btn
	var submitBtn = document.getElementById('jeu_submit_btn'),
		userTitle = document.getElementById('jeu_text'),
		trueAnswers = 0,
		trueAnswersSpan = document.getElementById('true_answers'),
		falseAnswers = 0,
		falseAnswersSpan = document.getElementById('false_answers');
	
	submitBtn.onclick = function () {
		if (userTitle.value.toUpperCase() == jeuImageListChild[selectedImage].firstChild.alt.toUpperCase()) { // si réponse correcte
			userTitle.style.border = '1px solid #44bf44'; // bordure verte
			trueAnswers++;
			trueAnswersSpan.innerHTML = trueAnswers + (trueAnswers > 1 ? ' réponses correctes' : ' réponse correcte');
			//alert('bravo !');
			lastSelImageLi.className = 'true_answer_icon';
			nextBtn.onclick(); // on séléctionne une nouvelle image
		}
		else {
			userTitle.style.border = '1px solid #e74c3c';
			falseAnswers++;
			falseAnswersSpan.innerHTML = falseAnswers + (falseAnswers > 1 ? ' réponses incorrectes' : ' réponse incorrecte');
			//alert('pas de chance...');
		}
	};

	// boutton rejouer
	var resetBtn = document.getElementById('jeu_reset_btn');
	
	resetBtn.onclick = function () {
		while (jeuImageList.firstChild != null) // on enlève toutes les anciennes images
			jeuImageList.removeChild(jeuImageList.firstChild);
		// on recharge des nouvelles images
		randomInit();
		// pour séléctionner la première image
		selectedImage = -1;
		lastSelImageLi = null;
		nextBtn.onclick();
		// activation des bouttons
		nextBtn.disabled = false;
		submitBtn.disabled = false;
		// rénitialisation du score
		trueAnswers = 0;
		trueAnswersSpan.innerHTML = '0 réponse correcte';
		falseAnswers = 0;
		falseAnswersSpan.innerHTML = '0 réponse incorrecte';
	};

	// appui sur une touche (entrée ou ctrl, ...) dans la zone de saisie
	function changeBorder() {
		//console.log(userTitle.style.border);
		if (userTitle.style.border != '1px solid #dddddd') // si une autre bordure est appliquée
			userTitle.style.border = '1px solid #dddddd'; // on remet la bordure initiale
	}

	userTitle.onkeydown = function (event) {
		//console.log('keydown');
		changeBorder();
		if (event.keyCode == 13) // entrée
			submitBtn.click(); // le focus reste tj sur la zone de saisie (tant que l'utilisateur n'a pas clické lui même sur le boutton)
		else if (event.keyCode == 17) // ctrl
			nextBtn.click(); // même chose le focus reste tj sur la zone de saisie
		//alert(event.keyCode);
	};

	// focus sur la zone de saisie
	userTitle.onfocus = function () { /*console.log('focus');*/ changeBorder(); };
	
	randomInit(); // chargement des images au début
	nextBtn.onclick(); // pour séléctionner une image au début
	chargementDeLaPage = false; // c'est bon si on est içi c'est que le chargement de la page a pris fin
}

/*-------- init-all --------*/
function initAll() {
	initView();
	initAnime();
	initTrailer();
	initScroll();
	initTopAnime();
	initClassement();
	initJeu();
}

window.onload = initAll;
