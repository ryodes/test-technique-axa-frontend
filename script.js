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

document.getElementById("form-devis").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  console.log(data);

  fetch("http://127.0.0.1:5000/api/devis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      console.log("Réponse de l'API :", result);
      alert("Devis envoyé avec succès !");
    })
    .catch((err) => {
      console.error(err);
      alert("Erreur lors de l'envoi du formulaire.");
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      return res.json();
    });
});
