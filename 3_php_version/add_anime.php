<?php
	// connexion à la base de données
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=anime', 'root', '');
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}
	
	// récupération des données (animes)
	if (isset($_GET['type_anime'])) // vérification du label
	{
		// requete
		$req = $bdd->prepare('SELECT image, nom, description, annee_production, genre, etoiles FROM anime_table WHERE type_anime = ?');
		$req->execute(array(htmlspecialchars($_GET['type_anime'])));

		while ($anime = $req->fetch()) // on récupère les anime ligne par ligne || 1 par 1
		{
		// affichage des animes
	?>
		<div class="anime">
			<?php
				echo '<img class="anime_image" src="rsc/images/' . $anime['image'] . '" />';
			?>
					<div class="anime_content">
						<h1 class="anime_title"><?php echo utf8_encode($anime['nom']); ?></h1>
						<div class="anime_info">
							<span class="anime_date">Année de production :</span><span class="anime_year"><?php echo $anime['annee_production']; ?></span>
							<span class="anime_genre">
								<?php
									switch (utf8_encode($anime['genre']))
									{
										case 'Shônen':
											echo '<span class="shonen_genre">' . utf8_encode($anime['genre']) . '</span>';
											break;
										case 'Seinen':
											echo '<span class="seinen_genre">' . utf8_encode($anime['genre']) . '</span>';
											break;
										case 'Mecha':
											echo '<span class="mecha_genre">' . utf8_encode($anime['genre']) . '</span>';
											break;
										case 'Shôjo':
											echo '<span class="shojo_genre">' . utf8_encode($anime['genre']) . '</span>';
									}
								?>
							</span>
						</div>
						<p>
						<?php echo utf8_encode($anime['description']); ?>
						</p>
						<div class="anime_stars_rating">
							<?php
								for ($i = 0; $i < $anime['etoiles']; $i++)
								{
									echo '<span class="yellow_star">&#9733;</span>';
								}
								for ($i = $anime['etoiles']; $i < 5; $i++)
								{
									echo '<span class="grey_star">&#9734;</span>';
								}
							?>
						</div>
					</div>
				</div>
	<?php
		}

		$req->closeCursor();	
	}
	//else
		//echo 'Aucun label specifiee !';
?>
