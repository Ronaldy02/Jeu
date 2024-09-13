// myImage = document.querySelector("img");

// myImage.addEventListener("click",function(){
//     let mySrc = myImage.getAttribute("src");
//     if (mySrc === "fond.jpg"){
//         myImage.setAttribute("src","fond2.jpg");
//     } else {
//         myImage.setAttribute("src","fond.jpg");
//     }
// })
var mot = "Bonjour";
var motCaché=Array(mot.length).fill("_");
var usedLetter=[]; 
var erreur="0";
var tentatives=0;
var nbLettresTrouvés=0;
var NoImage="0";
let image="Bonhome 0T.jpg";


function Debut(){
   
   document.getElementById("motCache").innerText ="Tentatives restantes: 9\n\n"+"Mot Caché : " +motCaché.join(" ");
   document.querySelector("#test").removeAttribute("hidden");
   document.querySelector("#bonhomme").removeAttribute("hidden");
}

let newMot = mot.toUpperCase();
function test(){
   let lettre = document.getElementById("lettre").value.toUpperCase();
   let occurence=0;
   ++tentatives;  
   NoImage= parseInt(NoImage);
   erreur= parseInt(erreur);

   if (usedLetter.length===0){
    usedLetter = usedLetter + lettre.toUpperCase();
   }else {
    usedLetter = usedLetter + ", " + lettre.toUpperCase();
   }

   // Boucle pour vérifier si la lettre est dans le mot
   for (let i=0; i<newMot.length; i++){ 
      if (lettre === newMot[i]){
        ++occurence;
        ++nbLettresTrouvés;
        motCaché[i] = lettre; 
      }
    }
    
    

    if (occurence===0){  
      document.getElementById("result").innerText =(" La lettre "+lettre + " n'est pas dans ce mot");
      ++erreur;
    }else{
      document.getElementById("result").innerText ="";
    }
    document.getElementById("motCache").innerText =" Tentatives restantes: " + (9 - parseInt(erreur)) +"\n\nMot Caché : " +motCaché.join("");
    document.getElementById("lettre").value="";

    // Fin du jeu
    if (erreur===9 || nbLettresTrouvés===mot.length){
      fin = true;
    }

    // Affichage du bonhomme
    image=image.replace(String(NoImage),String(erreur));
    document.getElementById("bonhome").setAttribute("src", image);
    NoImage=erreur;
    document.getElementById("usedLetter").innerText ="Lettres Utilisées : " + usedLetter;
    
    // Resultat final
    
    if (fin === true){
       if (nbLettresTrouvés === mot.length) {
         document.getElementById("Jeu").innerText =
           "Félicitations !!!\nVous avez trouvés le mot après " + tentatives +" tentatives.";
       } else {
         document.getElementById("Jeu").innerText = "Game Over !!!";
       }
    }
   


}
