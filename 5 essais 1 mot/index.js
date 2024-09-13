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



function test() {
  motEssayé = document.getElementById("mot").value.toUpperCase();
  let motArray=mot.split('');
  let motEssayéArray= motEssayé.split('');

    if (motEssayé.length=== 5){
      // Si le mot a 5 lettres
      var cellule = Array(5).fill("");
      ++essai;

      // Verification si chaque lettre du mot tenté est bon et ajout des couleurs

      for (let i = 0; i < motArray.length; i++) {
        if (motEssayéArray[i]===motArray[i]){
          cellule[i] = "rgb(0, 255, 30)";
          motEssayéArray[i] = null;
          // Ajout du score pour LTP
          score[essai - 1] = score[essai - 1] + (6 - essai) * 20;
          document.getElementById("C" + String(essai) + (i + 1)).style.backgroundColor = cellule[i];
          document.getElementById("C" + String(essai) + (i+1)).innerText = motEssayé[i];
        }
      }
      for (let i = 0; i < motArray.length; i++) {
        if (motEssayéArray[i]!==null && motArray.includes(motEssayéArray[i])){
          cellule[i] = "yellow";
          // Ajout du score pour LTP
          score[essai - 1] = score[essai - 1] + (6 - essai) * 10;
          document.getElementById("C" + String(essai) + (i + 1)).style.backgroundColor = cellule[i];    
        }
        document.getElementById("C" + String(essai) + (i + 1)).innerText =motEssayé[i];
      }

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