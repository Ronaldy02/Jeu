// Si ce n'est pas un recommencement

let username = localStorage.getItem("username");
let session = sessionStorage.getItem('session');
if (session===null){
   window.location.href="auth.html";
}
let userdata = JSON.parse(localStorage.getItem(username));
// Variable à conserver dans le navigateur
scoreTotal = parseInt(userdata["scoreTotal"]);
partieTerminée = parseInt(userdata["partieTerminée"]);
partieRéussie = parseInt(userdata["partieRéussie"]);
balance = parseInt(userdata["balance"]);




  let motEssayé = Array(5).fill("");
  let mot;
  let essai = 1;
  let score = [0, 0, 0, 0, 0];
  let ScoreFinal = scoreTotal;
  let cellule = Array(5).fill("");
  let lettres = "qwertyuiopasdfghjklzxcvbnm".split("");
  let longueur = 0;
  let currentRow = 0;
  let currentPosition = 0;
  let btnEnvoi = document.getElementById("envoi");
  let motArray;
  let dejaVue = true;
  let indexbonus;
  let lastPosition = 0;

  // Affichage initial
  const dScore = document.getElementById("score");
  dScore.innerText = username + " : " + ScoreFinal;
  const dPartie = document.getElementById("partie");
  dPartie.innerText = "Partie " + partieRéussie + "/" + partieTerminée;
  const dBalance = document.getElementById("nbpiece");
  dBalance.innerText = balance;

  for (i = 0; i < 5; i++) {
    motEssayé[i] = Array(5).fill("");
    cellule[i] = Array(5).fill("");
    for (j = 0; j < 5; j++) {
      cellule[i][j] = document.getElementById("C" + (i + 1) + (j + 1));
    }
  }

  // fonction pour lire le fichier
  fetch("ListeDeMots.csv")
    .then((response) => response.text())
    .then((data) => {
      //lire une ligne
      const ligne = data.split("\n").filter((ligne) => ligne.trim() !== "");

      //choix du mot aléatoire
      const indexaleatoire = Math.floor(Math.random() * ligne.length);
      mot = ligne[indexaleatoire].toUpperCase().trim();
      if (currentRow === 0) {
        console.log(mot);
      }
    });

  document.addEventListener("keydown", function (event) {
    let entrée = event.key.toUpperCase();

    // Enregistrement des lettres entrées par ordinateur
    currentPosition = motEssayé[currentRow].indexOf("");
    if (lastPosition + 2 === currentPosition) {
      currentPosition = lastPosition + 1;
    }
    if (indexbonus === 0 && lastPosition === 0) {
      currentPosition = lastPosition;
      lastPosition = 1;
    } else {
      lastPosition = currentPosition;
    }

    lettres.forEach((a, i) => {
      cellule = document.getElementById("C" + currentRow + currentPosition);
      if (entrée === a.toUpperCase()) {
        if (currentPosition !== -1) {
          if (currentPosition === indexbonus) {
            if (entrée === mot[indexbonus]) {
              cellule.style.backgroundColor = "rgb(0, 255, 30)";
            } else {
              cellule.style.backgroundColor = "gray";
            }
          }

          motEssayé[currentRow][currentPosition] = entrée;
          cellule.textContent = entrée;
          if (currentPosition === longueur && longueur < 5) {
            longueur++;
          }
          // if (currentPosition===longueur+1 && longueur<5){
          //   longueur=longueur+2;
          // }
        }

        // Changer la couleur du bouton envoyer
        currentPosition = motEssayé[currentRow].indexOf("");
        if (currentPosition === -1) {
          btnEnvoi.style.backgroundColor = "rgb(78, 239, 78)";
        } else {
          btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
        }
      } else if (entrée === "ENTER" && currentPosition === -1) {
        // Valider avec Enter

        event.preventDefault();
        test();
      } else if (entrée === "BACKSPACE" && longueur > 0) {
        // Suppression de la dernière entrée

        event.preventDefault();
        motEssayé[currentRow][longueur - 1] = "";
        document.getElementById("C" + currentRow + (longueur - 1)).textContent =
          "";
        // gestion de la couleur des casiers s'il sont des bonus
        if (indexbonus === longueur - 1) {
          cel = document.getElementById("C" + currentRow + (longueur - 1));
          cel.style.backgroundColor = "rgb(142, 243, 142)";
          cel.textContent = mot[indexbonus];
        }
        --longueur;
        entrée = "";

        currentPosition = motEssayé[currentRow].indexOf("");
        if (currentPosition === -1) {
          btnEnvoi.style.backgroundColor = "rgb(78, 239, 78)";
        } else {
          btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
        }
      }
    });
  });
  // effacer en cliquant sur une lettre
  let index;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      index = box.getAttribute("id")[2];
      // s'il n'est pas vide ou n'est pas un bonus
      if (motEssayé[currentRow][index] !== "" && index !== String(indexbonus)) {
        motEssayé[currentRow][index] = "";
        box.textContent = "";
        if (Number(index) === longueur - 1) {
          longueur--;
          console.log(longueur);
        }
      }
      currentPosition = motEssayé[currentRow].indexOf("");
      if (currentPosition === -1) {
        btnEnvoi.style.backgroundColor = "rgb(78, 239, 78)";
      } else {
        btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
      }
    });
  });

  // Enregistrement des lettres entrées au clavier virtuel
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      let entrée = key.textContent.toUpperCase();

      currentPosition = motEssayé[currentRow].indexOf("");
      if (lastPosition + 2 === currentPosition) {
        currentPosition = lastPosition + 1;
      }
      if (indexbonus === 0 && lastPosition === 0) {
        currentPosition = lastPosition;
        lastPosition = 1;
      } else {
        lastPosition = currentPosition;
      }

      lettres.forEach((a, i) => {
        cellule = document.getElementById("C" + currentRow + currentPosition);
        if (entrée === a.toUpperCase()) {
          if (currentPosition !== -1) {
            if (currentPosition === indexbonus) {
              if (entrée === mot[indexbonus]) {
                cellule.style.backgroundColor = "rgb(0, 255, 30)";
              } else {
                cellule.style.backgroundColor = "gray";
              }
            }

            motEssayé[currentRow][currentPosition] = entrée;
            cellule.textContent = entrée;
            if (currentPosition === longueur && longueur < 5) {
              longueur++;
            }
            // if (currentPosition===longueur+1 && longueur<5){
            //   longueur=longueur+2;
            // }
          }

          // Changer la couleur du bouton envoyer
          currentPosition = motEssayé[currentRow].indexOf("");
          if (currentPosition === -1) {
            btnEnvoi.style.backgroundColor = "rgb(78, 239, 78)";
          } else {
            btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
          }
        } else if (entrée === "ENVOYER" && currentPosition === -1) {
          // Valider avec Enter
          test();
        } else if (entrée === "-" && longueur > 0) {
          // Suppression de la dernière entrée

          motEssayé[currentRow][longueur - 1] = "";
          document.getElementById(
            "C" + currentRow + (longueur - 1)
          ).textContent = "";
          if (indexbonus === longueur - 1) {
            cel = document.getElementById("C" + currentRow + (longueur - 1));
            cel.style.backgroundColor = "rgb(142, 243, 142)";
            cel.textContent = mot[indexbonus];
          }
          --longueur;
          entrée = "";

          currentPosition = motEssayé[currentRow].indexOf("");
          if (currentPosition === -1) {
            btnEnvoi.style.backgroundColor = "rgb(78, 239, 78)";
          } else {
            btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
          }
        } 
        // else if entrée
      });
      playSound();
    });
  });

  function test() {
    currentPosition = motEssayé[currentRow].indexOf("");
    if (currentPosition === -1) {
      // Si le mot a 5 lettres
      motArray = mot.split("");
      let motEssayéArray = motEssayé[currentRow].slice();

      // Verification si chaque lettre du mot tenté est bon et ajout des couleurs
      motArray.forEach((lettre, i) => {
        if (motEssayéArray[i] === lettre) {
          console.log("Essai: " + motEssayéArray[i], "lettre: ", lettre);
          // si la lettre est bien placée
          console.log(motEssayéArray[i] + " est bien placée");
          document.getElementById(motEssayéArray[i]).style.backgroundColor =
            "rgb(0, 255, 30)";
          document.getElementById("C" + currentRow + i).style.backgroundColor =
            "rgb(0, 255, 30)";
          // on efface les lettres du mot
          motArray[i] = "";
          motEssayéArray[i] = "";
          // Ajout du score pour LTP
          score[currentRow] += (5 - currentRow) * 20;
        }
      });

      motArray.forEach((lettre, i) => {
        console.log("Essai: " + motEssayéArray[i], "lettre: ", lettre);
        if (motEssayéArray[i] !== "") {
          if (motArray.includes(motEssayéArray[i])) {
            console.log(motEssayéArray[i] + " mal placée");
            // si la lettre est dans le mot mais pas verte dans le clavier
            // Pour conserver la priorité de couleur des lettres dans le clavier (vert-jaune-gris)
            if (
              document.getElementById(motEssayé[currentRow][i]).style
                .backgroundColor !== "rgb(0, 255, 30)"
            ) {
              document.getElementById(motEssayéArray[i]).style.backgroundColor =
                "yellow"; // Changer la couleur de la lettre dans le clavier
            }

            document.getElementById(
              "C" + currentRow + i
            ).style.backgroundColor = "yellow"; // Changer la couleur de la cellule de la lettre
            motArray[motArray.indexOf(motEssayéArray[i])] = "";

            // Ajout du score pour LT
            score[currentRow] = score[currentRow] + (5 - currentRow) * 10;
          } else {
            //si la lettre n'est pas dans le mot
            console.log(motEssayéArray[i] + " n'est pas dans le mot");
            // si la lettre n'etait pas coloré dans le clavier
            if (
              document.getElementById(motEssayé[currentRow][i]).style
                .backgroundColor === ""
            ) {
              document.getElementById(motEssayéArray[i]).style.backgroundColor =
                "gray";
            }
          }
        }
      });

      // Affichage du score
      ScoreFinal = score.reduce((total, current) => total + current, 0);
      dScore.innerText = "Score : " + ScoreFinal;

      // Remuneration
      balance += Math.round(ScoreFinal / 100);
      dBalance.innerText = balance;
      dScore.innerText = ScoreFinal;
      console.log(balance);

      // Affichage du resultat
      if (mot === motEssayé[currentRow].join("")) {
        document.getElementById("ombre").style.display="flex";
        document.getElementById("congratulations").style.display='flex';
        // document.getElementById("Resultat").innerText = "Félicitations !!!";
        // document.getElementById("Resultat").style.color = "green";
        // Ajout du score pour les essais restants
        for (i = essai; i < 5; i++) {
          score[i] = score[i - 1];
        }
        document.getElementById("score").innerText =
          username + " : " + ScoreFinal;
        scoreTotal += ScoreFinal;
        partieRéussie+=1;
        saveData(1);
      } else if (essai === 5) {
        document.getElementById("ombre").style.display = "flex";
        document.getElementById("gameover").style.display = "flex";
        document.getElementById("motatrouver").innerText =
          "Le mot à trouver était : " + mot;
        scoreTotal = ScoreFinal;
        saveData(0);
      }

      longueur = 0;
      essai++;
      if (currentRow < 4) {
        currentRow++;
      }
      btnEnvoi.style.backgroundColor = "rgb(148, 209, 148)";
    }
  }
  function devoiler() {
    //choix de la lettre à devoiler aléatoirement

    k = 0;
    // ou s'il n'a pas assez de pièces ou si le jeu n'est pas terminé
    // si la lettre n'a pas déjà été trouvé par l'utilisateur
    while (dejaVue === true && balance >= 50 && currentRow < 5 && k < 5) {
      indexbonus = Math.floor(Math.random() * 4);
      lettrebonus = mot[indexbonus];
      l = document.getElementById(mot[indexbonus]);
      if (l.style.backgroundColor !== "rgb(0, 255, 30)") {
        dejaVue = false;
        cell = document.getElementById("C" + currentRow + indexbonus);
        cell.textContent = l.textContent;
        cell.style.backgroundColor = "rgb(0, 255, 30)";
        l.style.backgroundColor = "rgb(0, 255, 30)";
        motEssayé[currentRow][indexbonus] = l.textContent;
        balance -= 50;
        dBalance.innerText = balance;
      }
    }
  }

  function supprimer() {
    let lettreàEffacer = mot[0];
    nb = 0;
    k = 0;
    while (nb < 5 && balance >= 50) {
      const id = Math.floor(Math.random() * 25);
      lettreàEffacer = lettres[id].toUpperCase();
      l = document.getElementById(lettreàEffacer);
      if (!mot.includes(lettreàEffacer) && l.style.backgroundColor === "") {
        l.style.backgroundColor = "gray";
        nb++;
      }
      if (nb === 5) {
        balance -= 50;
        dBalance.innerText = balance;
      }
    }
    nb = 0;
  }
  function showCongratulations() {
    document.getElementById("congratulations").classList.remove("hidden");
  }

  function showGameOver() {
    document.getElementById("gameover").classList.remove("hidden");
  }

  function playSound() {
    var sound = document.getElementById("clickSound");
    sound.play();
  }


function saveData(R) { // fonction qui enregistre les données de l'utilisateur
  balance += scoreTotal / 100;
  localStorage.setItem(
    username,
    JSON.stringify({
      scoreTotal: 0,
      partieRéussie: partieRéussie,
      partieTerminée: partieTerminée+1,
      balance: balance,
    })
  );
  // localStorage.setItem("ScoreTotal", scoreTotal);
  // localStorage.setItem("partieTerminée", partieTerminée + 1);
  // localStorage.setItem("partieReussie", partieRéussie + R);
  // localStorage.setItem("balance", balance + 10 * R);
}

function fin() {  // fonction pour le message à la fin de la partie
  console.log(
    "test " + document.getElementById("congratulations").style.display
  );
  document.getElementById("congratulations").style.display = "none";
}
