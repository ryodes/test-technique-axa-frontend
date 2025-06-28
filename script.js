const opportunites = [
  { numero: "001", client: "Acme Corp", tarif: "1 200 €" },
  { numero: "002", client: "Globex", tarif: "980 €" },
  { numero: "003", client: "Initech", tarif: "1 500 €" },
];

function afficherTableau() {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = ""; // Nettoyage au cas où

  opportunites.forEach((opp) => {
    const ligne = document.createElement("tr");

    ligne.innerHTML = `
      <td>${opp.numero}</td>
      <td>${opp.client}</td>
      <td>${opp.tarif}</td>
      <td>
        📄 <span class="icon-pdf">PDF</span> | 📝 <span class="icon-word">Word</span>
      </td>
    `;

    tbody.appendChild(ligne);
  });
}

// Exécution au chargement
window.onload = afficherTableau;

// Fonction qui affiche/masque le champ destination selon la sélection
function toggleDestination() {
  const radios = document.getElementsByName("typeOuvrage");
  const destinationDiv = document.getElementById("destination-wrapper");

  for (const radio of radios) {
    radio.addEventListener("change", () => {
      console.log(destinationDiv);
      if (radio.checked && radio.value === "habitation") {
        destinationDiv.disabled = false;
      } else if (radio.checked) {
        destinationDiv.disabled = true;
        destinationDiv.value = "";
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", toggleDestination);
