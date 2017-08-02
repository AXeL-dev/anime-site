using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

/*----------------------------------------------------
 * 
 * Anime Site v2 by AXeL, XLord & Smile
 * La 2ème version Asp a été crée le : 10/01/2015
 * 
 ----------------------------------------------------*/

namespace AnimeSite
{
    public partial class v2_anime_site : System.Web.UI.Page
    {
        // attributs
        static SqlConnection cn = new SqlConnection("server=.;initial catalog=anime;integrated security=true");
        SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM anime_table", cn); //SELECT type_anime, image, nom, description, annee_production, genre, etoiles FROM anime_table
        DataSet ds = new DataSet();

        // page_load
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                // on récupère les données de la bdd (base de données) en mode déconnecté
                da.Fill(ds, "animeTable");
                // on remplie les zones d'animes en chargeant les animes depuis la bdd
                action.InnerHtml += chargerAnime("action");
                aventure.InnerHtml += chargerAnime("aventure");
                psychologie.InnerHtml += chargerAnime("psychologie");
                scifiction.InnerHtml += chargerAnime("sci-fiction");
                tranche_de_vie.InnerHtml += chargerAnime("tranche_de_vie");
                drame.InnerHtml += chargerAnime("drame");
                comédie.InnerHtml += chargerAnime("comédie");
                sport.InnerHtml += chargerAnime("sport");
            }
        }

        // méthode qui s'occupe de charger les animes demandés
        private string chargerAnime(string typeAnime)
        {
            string codeHtml = ""; // le code HTML retourné par cette fonction sera stocké içi
            // on parcours toutes les lignes de la table
            for (int i = 0; i < ds.Tables["animeTable"].Rows.Count; i++)
            {
                // on ne prend que les lignes qui ont le type d'anime passé en parametre à la fonction
                if (ds.Tables["animeTable"].Rows[i]["type_anime"].ToString() == typeAnime)
                {
                    // ce code HTML est structuré selon le site d'anime
                    codeHtml += "<div class=\"anime\">\n\t\t\t\t\t";
                    codeHtml += "<img class=\"anime_image\" src=\"rsc/images/" + ds.Tables["animeTable"].Rows[i]["image"] + "\" />\n\t\t\t\t\t";
                    codeHtml += "<div class=\"anime_content\">\n\t\t\t\t\t\t";
                    codeHtml += "<h1 class=\"anime_title\">" + ds.Tables["animeTable"].Rows[i]["nom"] + "</h1>\n\t\t\t\t\t\t";
                    codeHtml += "<div class=\"anime_info\">\n\t\t\t\t\t\t\t";
                    codeHtml += "<span class=\"anime_date\">Année de production :</span><span class=\"anime_year\">" + ds.Tables["animeTable"].Rows[i]["annee_production"] + "</span>\n\t\t\t\t\t\t\t";
                    codeHtml += "<span class=\"anime_genre\">\n\t\t\t\t\t\t\t\t";
                    switch (ds.Tables["animeTable"].Rows[i]["genre"].ToString())
                    {
                        case "Shônen":
                            codeHtml += "<span class=\"shonen_genre\">" + ds.Tables["animeTable"].Rows[i]["genre"] + "</span>\n\t\t\t\t\t\t\t";
                            break;
                        case "Seinen":
                            codeHtml += "<span class=\"seinen_genre\">" + ds.Tables["animeTable"].Rows[i]["genre"] + "</span>\n\t\t\t\t\t\t\t";
                            break;
                        case "Mecha":
                            codeHtml += "<span class=\"mecha_genre\">" + ds.Tables["animeTable"].Rows[i]["genre"] + "</span>\n\t\t\t\t\t\t\t";
                            break;
                        case "Shôjo":
                            codeHtml += "<span class=\"shojo_genre\">" + ds.Tables["animeTable"].Rows[i]["genre"] + "</span>\n\t\t\t\t\t\t\t";
                            break;
                    }
                    codeHtml += "</span>\n\t\t\t\t\t\t";
                    codeHtml += "</div>\n\t\t\t\t\t\t";
                    codeHtml += "<p>" + ds.Tables["animeTable"].Rows[i]["description"] + "</p>\n\t\t\t\t\t\t";
                    codeHtml += "<div class=\"anime_stars_rating\">\n\t\t\t\t\t\t\t";
                    for (int j = 0; j < Convert.ToInt32(ds.Tables["animeTable"].Rows[i]["etoiles"]); j++)
                    {
                        codeHtml += "<span class=\"yellow_star\">&#9733;</span>\n\t\t\t\t\t\t\t";
                    }
                    for (int j = Convert.ToInt32(ds.Tables["animeTable"].Rows[i]["etoiles"]); j < 5; j++)
                    {
                        codeHtml += "<span class=\"grey_star\">&#9734;</span>\n\t\t\t\t\t\t\t";
                    }
                    codeHtml += "</div>\n\t\t\t\t\t";
                    codeHtml += "</div>\n\t\t\t\t";
                    codeHtml += "</div>\n\t\t\t\t";
                }
            }
            // il ne nous reste plus que retourner le code HTML ^^
            return codeHtml;
        }



    }
}