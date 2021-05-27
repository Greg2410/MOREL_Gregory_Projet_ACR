$(document).ready(
function (){
	if($("#loading").length){
		$('#loading').hide();
	}
	
})

var Img = [];

var Art = [];

var Url = "";


function loadJson(){
 	// CHARGEMENT Json : jQuery 
 	$.ajax({
 		// type de donnée : ici Json
		dataType: "json", 
 		// Requête GET
 		type: "GET",
 		// chemin du fichier
 		url: "json/data.json", 
 		// chargement avec succès
 		success: function(json) {
 			  // récupération des données
 			json.image.forEach(function(item) {
 				console.log(item);
 				Img.push(item);
			});
			RenderIMG();
			json.article.forEach(function(item) {
				console.log(item);
				Art.push(item);
			})
			RenderArt();

			Url = json.url;

			setAction($("#my-form"));
			$('.simple-item').slick({
			   dots: true,
			   infinite: true,
			   speed: 500,
			   slidesToScroll: 1,
			   fade: true,
			   cssEase: 'linear'
			});
		}
	})
}	
	
 			  
// 		  },
// 		  // en cas d'erreur
// 		  error : function(result, statut, error) {
// 			  console.log(error);
// 		  }
// 		});
// 	}


// var personne = [
// 	// {id:"ayala", img:"img1.png",nom:"Rubén", prenom:"Ayala", bio:"Rubén Hugo Ayala Zanabria, né le 8 janvier 1950 à Santa Fe, est un footballeur et entraîneur argentin. En tant qu'attaquant, Rubén Ayala est international argentin à 25 reprises (1969-1974) pour 11 buts."},
// 	// {id:"pollàk", img:"img2.png",nom:"Jaroslav", prenom:"Pollák", bio:"Jaroslav Pollák est un footballeur tchécoslovaque et slovaque, né le 11 juillet 1947 à Medzev. En tant que défenseur, il fut international tchécoslovaque à 49 reprises (1968-1976) pour un but. Il participa à la Coupe du monde de football de 1970, au Mexique"},
// 	// {id:"szarmach", img:"img3.png",nom:"Andrzej", prenom:"Szarmach", bio:"Andrzej Szarmach, né le 3 octobre 1950 à Gdańsk, est un footballeur international puis entraîneur polonais. Il évolue au poste d'avant-centre de la fin des années 1960 à la fin des années 1980."},
// 	// {id:"cruyff", img:"img4.png", nom:"Johan", prenom:"Cruyff", bio:"Hendrik Johannes Cruijff, dit Johan Cruyff ou Johan Cruijff (Écouter), né le 25 avril 1947 à Amsterdam et mort le 24 mars 2016 à Barcelone, est un footballeur international néerlandais, qui évoluait au poste d'attaquant, avant de devenir entraîneur."},
// 	// {id:"santinni", img:"img5.png", nom:"Jacques", prenom:"Santini", bio:"Jacques Santini, né le 25 avril 1952 à Delle dans le Territoire de Belfort, est un footballeur français devenu entraîneur. Il fut le sélectionneur des « Bleus » du 21 août 2002 au 25 juin 2004. Il est actuellement manager général du Paris Football Club."},
// 	// {id:"ancelotti", img:"img6.png", nom:"Carlo", prenom:"Ancelotti", bio:"Carlo Ancelotti, né le 10 juin 1959 à Reggiolo (Italie), est un footballeur international italien, reconverti comme entraîneur. Surnommé Carletto ou « Il mister », le milieu de terrain connaît une brillante carrière à l'AS Rome, où il porte le brassard de capitaine et remporte un titre de champion d'Italie et quatre coupes nationales."},
// ]; 

function RenderIMG(){
	Img.forEach(item => {
		$("#img").append('<div><img id="'+item.titre+'" src="img/'+item.chemin+'" alt="img" /></div	>');
	});
	
}

function RenderArt(){
	Art.forEach(item =>  {
		$("#art").append('<div class="grid-item"><h1>"'+item.titre+'"</h1> <img id="'+item.titre+'" src="img/'+item.image+'" alt="article" /> <p>"'+item.description+'"</p></div>');
	});
	// init Masonry
	var grid = document.querySelector('.grid');
	
	var msnry = new Masonry( grid, {
  		itemSelector: '.grid-item',
  		columnWidth: '.grid-sizer',
  		percentPosition: true
	});
}

function RenderContact(){
	console.log(Url);

	$('#loading').show();

	$('#reponse').html("Envoie en cours");

	$.ajax({
		dataType: "json",

		type: "POST",

		data: { 
			email: $("#floatingInput").val(), 
			message: $("#floatingPassword").val() },

		url: Url,
		//success
		success: function(json) {
			$('#loading').hide();
			$('#reponse').html('Félicitation, le mail a bien été envoyé !')
		},
		//erreur
		error : function(result, statut, error) {
			$('#loading').hide();
			$('#reponse').html("Erreur lors de l'envoie du mail");
			console.log(error);
		  }
	});
}

function setAction(form) {
	form.action = Url;
  }

$(function(){
	loadJson();
});

// function AfficherBio(id){
// 	var joueur = personne.find(j => j.id === id);
// 	$("#np").text(joueur.nom+" "+joueur.prenom);
// 	$("#ddn").text(joueur.dateNaiss);
// 	$("#desc").text(joueur.bio);
// 	$("img").removeClass("bordure"); 
// 	$("#" + id).addClass("bordure");
// 	$("#modal").modal();
// }

