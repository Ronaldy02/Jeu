let motEssayé;
let mot;
let essai=0;
let score=[0,0,0,0,0];
let ScoreFinal=0;


// fonction pour lire le fichier
fetch("ListeDeMots.csv").then(response => response.text()).then(data => {
    //lire une ligne
    const ligne = data.split("\n");
    // enlèvement des lignes vides
    let lignefiltré = ligne.filter(ligne => ligne.trim() !== "");

    //choix du mot aléatoire
    const indexaleatoire = Math.floor(Math.random()*(lignefiltré.length-1))+1;
     mot= lignefiltré[indexaleatoire].toUpperCase().trim();
     console.log(mot);
})


const input=document.getElementById("mot");
const form=document.getElementById("submit");


function test() {
    motEssayé = document.getElementById("mot").value.toUpperCase();
    if (motEssayé.length=== 5){
      // Si le mot a 5 lettres
      var cellule = Array(5).fill("");
      ++essai;

      // Verification si la lettre tentée est bonne et ajout des couleurs

      for (let i = 0; i < mot.length; i++) {
        for (let j = 0; j < motEssayé.length; j++) {
          if (mot[i] === motEssayé[j]) {
            if (mot[i] !== motEssayé[i]) {
              cellule[j] = "yellow";
              // Ajout du score pour LT
              score[essai - 1] = score[essai - 1] + (6 - essai) * 10;
              break;
            } else {
              cellule[j] = "rgb(0, 255, 30)";
              // Ajout du score pour LTP
              score[essai - 1] = score[essai - 1] + (6 - essai) * 20;
              break;
            }
          }
        }
      }

      // Affichage des couleurs
      document.getElementById("C" + String(essai) + "1").style.backgroundColor =
        cellule[0];
      document.getElementById("C" + String(essai) + "2").style.backgroundColor =
        cellule[1];
      document.getElementById("C" + String(essai) + "3").style.backgroundColor =
        cellule[2];
      document.getElementById("C" + String(essai) + "4").style.backgroundColor =
        cellule[3];
      document.getElementById("C" + String(essai) + "5").style.backgroundColor =
        cellule[4];

      // Affichage des lettres
      document.getElementById("C" + String(essai) + "1").innerText =
        motEssayé[0];
      document.getElementById("C" + String(essai) + "2").innerText =
        motEssayé[1];
      document.getElementById("C" + String(essai) + "3").innerText =
        motEssayé[2];
      document.getElementById("C" + String(essai) + "4").innerText =
        motEssayé[3];
      document.getElementById("C" + String(essai) + "5").innerText =
        motEssayé[4];

      // Vider l'input
      document.getElementById("mot").value = "";

      // Affichage du resultat
      if (mot === motEssayé) {
        document.getElementById("Resultat").innerText = "Félicitations !!!";
        document.getElementById("Resultat").style.color = "green";
        // Ajout du score pour les essais restants
        for (i=essai; i<5; i++){
            score[i]=score[i-1];
        }
        document.getElementById("score").innerText = "Score : " + ScoreFinal;
      }
      if (essai === 5 && motEssayé !== mot) {
        document.getElementById("Resultat").innerText = "Game Over !!!";
        document.getElementById("Resultat").style.color = "red";
      }

      // Affichage du score
      ScoreFinal = score.reduce((total, current) => total + current, 0);
      document.getElementById("score").innerText = "Score : " + ScoreFinal+" points";

    }else{ // Alerte si le mot entré n'a pas 5 lettres
        alert("Entrer un mot de 5 lettres");
         document.getElementById("mot").value = "";
        
    }
   
}

// Valider avec Enter
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    test();
  }
  
});