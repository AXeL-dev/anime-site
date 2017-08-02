<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="v2_anime_site.aspx.cs" Inherits="AnimeSite.v2_anime_site" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- Anime Web Site, version 2.0 by AXeL
     Date de création : 06/12/2014
     Date de la dernière modification : 09/12/2014
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
	<link rel="stylesheet" href="v2_default_style.css" />
	<title>Anime v2</title>
</head>
<body class="body_image_style">
	<div id="main_div">
		<!-- logo & v2 -->
		<img id="logo" src="rsc/logo.png" />
		<img id="v2" src="v2_rsc/v2.png" />
		<!-- header icone & link -->
		<img id="header_icone" src="v2_rsc/icone.png" />
		<a id="header_link" href="#home">Découvrez le monde des animes !</a>
		<!-- top -->
		<div class="top">
		</div>
		<!-- slider -->
		<div class="slider_container">
			<ul id="image_slider">
				<li><img src="rsc/slider_images/575x280/sao.jpg" alt="sword art online" /></li>
				<li><img src="rsc/slider_images/575x280/code_geass.jpg" alt="code geass" /></li>
				<li><img src="rsc/slider_images/575x280/death_note.jpg" alt="death note" /></li>
				<li><img src="rsc/slider_images/575x280/hyouka.jpg" alt="hyouka" /></li>
				<li><img src="rsc/slider_images/575x280/steins-gate.jpg" alt="steins;gate" /></li>
				<li><img src="rsc/slider_images/575x280/log_horizon.jpg" alt="log horizon" /></li>
			</ul>
			<span class="slider_nav" id="prev"></span>
			<span class="slider_nav" id="next"></span>
		</div>
		<!-- nav_bar -->
		<div class="nav_bar">
			<ul>
				<li id="home"><a href="#"><img src="rsc/nav_bar_icons/home.png" />Accueil</a></li>
				<li><a href="#action"><img src="rsc/nav_bar_icons/action_white.png" />Action</a></li>
				<li><a href="#aventure"><img src="rsc/nav_bar_icons/aventure_white.png" />Aventure</a></li>
				<li><a href="#psychologie"><img src="rsc/nav_bar_icons/psycho_white.png" />Psychologie</a></li>
				<li><a href="#sci-fiction"><img src="rsc/nav_bar_icons/sci_white.png" />Sci-Fiction</a></li>
				<li><a href="#tranche_de_vie"><img src="rsc/nav_bar_icons/life_white.png" />Tranche de vie</a></li>
				<li><a href="#drame"><img src="rsc/nav_bar_icons/drame_white.png" />Drame</a></li>
				<li><a href="#comédie"><img src="rsc/nav_bar_icons/comedie_white.png" />Comédie</a></li>
				<li><a href="#sport"><img src="rsc/nav_bar_icons/sport_white.png" />Sport</a></li>
				<li id="sub_menu">
					<a id="sub_menu_image"></a>
					<ul>
						<li><a href="#bandes_annonces"><img src="rsc/nav_bar_icons/video_white.png" />Bandes-Annonces</a></li>
						<li><a href="#animes_a_venir"><img src="rsc/nav_bar_icons/a_venir_white.png" />Animes à venir</a></li>
						<li><a href="#jeu_de_devinette"><img src="rsc/nav_bar_icons/jeu_white.png" />Jeu de devinette</a></li>
					</ul>
				</li>
			</ul>
			<ul class="view">
				<li class="textView" id="default_view"><img src="rsc/toText.png" /></li>
				<li class="imageView"><img src="rsc/toImg.png" /></li>
			</ul>
		</div>
		<!-- body_container -->
		<div class="body_container">
		<!-- body_wrapper -->
		<div id="body_wrapper">
			<!-- Action -->
			<div class="anime_type" id="action" runat="server">
				<h1><img src="rsc/nav_bar_icons/action_grey.png" />Action<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Aventure -->
			<div class="anime_type" id="aventure" runat="server">
				<h1><img src="rsc/nav_bar_icons/aventure_grey.png" />Aventure<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Psychologie -->
			<div class="anime_type" id="psychologie" runat="server">
				<h1><img src="rsc/nav_bar_icons/psycho_grey.png" />Psychologie<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Sci-Fiction -->
			<div class="anime_type" id="scifiction" runat="server">
				<h1><img src="rsc/nav_bar_icons/sci_grey.png" />Sci-Fiction<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Tranche de vie -->
			<div class="anime_type" id="tranche_de_vie" runat="server">
				<h1><img src="rsc/nav_bar_icons/life_grey.png" />Tranche de vie<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Drame -->
			<div class="anime_type" id="drame" runat="server">
				<h1><img src="rsc/nav_bar_icons/drame_grey.png" />Drame<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Comédie -->
			<div class="anime_type" id="comédie" runat="server">
				<h1><img src="rsc/nav_bar_icons/comedie_grey.png" />Comédie<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Sport -->
			<div class="anime_type" id="sport" runat="server">
				<h1><img src="rsc/nav_bar_icons/sport_grey.png" />Sport<input type="button" class="show_hide_anime show_anime" /><hr /></h1>
			</div>
			<!-- Bandes-annonces -->
			<div class="anime_type" id="bandes_annonces">
				<h1><img src="rsc/nav_bar_icons/video_grey.png" />Bandes-annonces<hr /></h1>
				<span class="anime_trailer">
					<h1 class="anime_title">death note</h1>
					<video controls poster="rsc/images/death-note.jpg" width="210" height="220">
						<source src="rsc/videos/mp4/death-note.mp4" type="video/mp4" />
						<source src="rsc/videos/ogg/death-note.ogg" type="video/ogg" />
					</video>
				</span>
				<span class="anime_trailer">
					<h1 class="anime_title">code geass</h1>
					<video controls poster="rsc/images/code-geass.jpg" width="210" height="220">
						<source src="rsc/videos/mp4/code-geass.mp4" type="video/mp4" />
						<source src="rsc/videos/ogg/code-geass.ogg" type="video/ogg" />
					</video>
				</span>
				<span class="anime_trailer">
					<h1 class="anime_title">sword art online</h1>
					<video controls poster="rsc/images/sao.jpg" width="210" height="220">
						<source src="rsc/videos/mp4/sao.mp4" type="video/mp4" />
						<source src="rsc/videos/ogg/sao.ogg" type="video/ogg" />
					</video>
				</span>
				<span class="anime_trailer">
					<h1 class="anime_title">shingeki no kyojin</h1>
					<video controls poster="rsc/images/shingeki-no-kyojin.jpg" width="210" height="220">
						<source src="rsc/videos/mp4/shingeki-no-kyojin.mp4" type="video/mp4" />
						<source src="rsc/videos/ogg/shingeki-no-kyojin.ogg" type="video/ogg" />
					</video>
				</span>
				<span class="anime_trailer">
					<h1 class="anime_title">steins;gate</h1>
					<video controls poster="rsc/images/steins-gate.jpg" width="210" height="220">
						<source src="rsc/videos/mp4/steins-gate.mp4" type="video/mp4" />
						<source src="rsc/videos/ogg/steins-gate.ogg" type="video/ogg" />
					</video>
				</span>
			</div>
			<!-- Animes à venir -->
			<div class="anime_type" id="animes_a_venir">
				<h1><img src="rsc/nav_bar_icons/a_venir_grey.png" />Animes à venir<hr /></h1>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/assassination-classroom.jpg"/>
					<p>Assassination Classroom</p>
					<span class="new_anime_pub"><img src="rsc/new.png"/></span>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/durarara-s2.jpg"/>
					<p>Durarara!! Saison 2</p>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/aldnoah-zero-s2.jpg"/>
					<p>Aldnoah.Zero Saison 2</p>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/tokyo-ghoul-s2.jpg"/>
					<p>Tokyo Ghoul Saison 2</p>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/seiken-tsukai-no-world-break.jpg"/>
					<p>Seiken Tsukai no World Break</p>
					<span class="new_anime_pub"><img src="rsc/new.png"/></span>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/soukyuu-no-fafner-dead-aggressor-exodus.jpg"/>
					<p>Soukyuu no Fafner: Dead Aggressor - Exodus</p>
					<span class="new_anime_pub"><img src="rsc/new.png"/></span>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/shinmai-maou-no-keiyakusha.jpg"/>
					<p>Shinmai Maou no Keiyakusha</p>
					<span class="new_anime_pub"><img src="rsc/new.png"/></span>
				</span>
				<span class="new_anime">
					<img class="new_anime_image" src="rsc/images/upcoming_anime/tsukimonogatari.jpg"/>
					<p>Tsukimonogatari</p>
					<span class="new_anime_pub"><img src="rsc/new.png"/></span>
				</span>
			</div>
			<!-- Jeu de devinette -->
			<div class="anime_type" id="jeu_de_devinette">
				<h1><img src="rsc/nav_bar_icons/jeu_grey.png" />Jeu de devinette<hr /></h1>
				<ul class="random_anime_list"></ul>
				<input id="jeu_text" type="text" placeholder="Devinez le nom de l'anime séléctionné..."/>
				<input id="jeu_next_btn" type="button"/>
				<input id="jeu_submit_btn" type="button" value="J'ai deviné !"/>
				<span id="jeu_score">
					<h1>Score<input type="button" class="show_hide_anime hide_anime" /></h1>
					<div style="display: none;">
						<span id="true_answers">0 réponse correcte</span>
						<span id="false_answers">0 réponse incorrecte</span>
						<input id="jeu_reset_btn" type="button" value="Rejouer"/>
					</div>
				</span>
			</div>
			<a href="#" id="scroll_up"></a>
		</div><!-- fin body_wrapper -->
		</div><!-- fin body_container -->
		<!-- footer -->
		<div class="footer">
			<div id="top_anime">
				<h1>Top<img src="rsc/top_15.png" />Anime</h1>
				<span class="top_anime_pager">
					<span id="default_pager" ></span>
					<span></span>
					<span></span>
				</span>
				<div id="top_anime_slider">
					<ul>
						<li><img src="rsc/images/code-geass.jpg" alt="code geass"/></li>
						<li><img src="rsc/images/death-note.jpg" alt="death note"/></li>
						<li><img src="rsc/images/sao.jpg" alt="sword art online"/></li>
						<li><img src="rsc/images/shingeki-no-kyojin.jpg" alt="shingeki no kyojin"/></li>
						<li><img src="rsc/images/mirai-nikki.jpg" alt="mirai nikki"/></li>
						<li><img src="rsc/images/guilty-crown.jpg" alt="guilty crown"/></li>
						<li><img src="rsc/images/btooom.jpg" alt="btooom !"/></li>
						<li><img src="rsc/images/phantom.jpg" alt="Phantom: Requiem for the Phantom"/></li>
						<li><img src="rsc/images/hyouka.jpg" alt="hyouka"/></li>
						<li><img src="rsc/images/toradora.jpg" alt="toradora!"/></li>
						<li><img src="rsc/images/shin-sekai-yori.jpg" alt="Shin sekai yori"/></li>
						<li><img src="rsc/images/nagi-no-asukara.jpg" alt="nagi no asukara"/></li>
						<li><img src="rsc/images/oreimo.jpg" alt="Ore no imouto ga konna ni kawaii wake ga nai"/></li>
						<li><img src="rsc/images/sakurasou-no-pet-na-kanojo.jpg" alt="Sakurasô no Pet na kanojo"/></li>
						<li><img src="rsc/images/steins-gate.jpg" alt="steins;gate"/></li>
					</ul>
				</div>
			</div>
			<div id="classement">
				<h1><img src="rsc/classement.png" />Classement</h1>
				<ol>
					<li>
						<img src="rsc/images/code-geass.jpg" alt="code geass"/>
						<h1 class="anime_title">code geass</h1>
					</li>
					<li>
						<img src="rsc/images/death-note.jpg" alt="death note"/>
						<h1 class="anime_title">death note</h1>
					</li>
					<li>
						<img src="rsc/images/sao.jpg" alt="sword art online"/>
						<h1 class="anime_title">sword art online</h1>
					</li>
					<li>
						<img src="rsc/images/shingeki-no-kyojin.jpg" alt="shingeki no kyojin"/>
						<h1 class="anime_title">shingeki no kyojin</h1>
					</li>
					<li>
						<img src="rsc/images/btooom.jpg" alt="btooom !"/>
						<h1 class="anime_title">btooom !</h1>
					</li>
					<li>
						<img src="rsc/images/clannad.jpg" alt="clannad after story"/>
						<h1 class="anime_title">clannad after story</h1>
					</li>
					<li>
						<img src="rsc/images/hyouka.jpg" alt="hyouka"/>
						<h1 class="anime_title">hyouka</h1>
					</li>
					<li>
						<img src="rsc/images/mirai-nikki.jpg" alt="mirai nikki"/>
						<h1 class="anime_title">mirai nikki</h1>
					</li>
					<li>
						<img src="rsc/images/steins-gate.jpg" alt="steins;gate"/>
						<h1 class="anime_title">steins;gate</h1>
					</li>
					<li>
						<img src="rsc/images/hunter-x-hunter.jpg" alt="hunter x hunter"/>
						<h1 class="anime_title">hunter x hunter</h1>
					</li>
				</ol>
			</div>
			<span id="design"><a href="v2_names.html">Design + Code By: AXeL, X Lord & Smile</a></span>
		</div>
		<!-- FAQ -->
		<div id="faq">
			<h1 class="faq_header"><img src="rsc/faq.png" />F<br />A<br />Q</h1>
			<div class="faq_text" style="display: none;">
				<iframe src="faq.html"></iframe>
			</div>
		</div>
		<!-- javascript link -->
		<script src="v2_default_script.js"></script>
	</div>
</body>
</html>
