async function afficherTableau() {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = ""; // Nettoyage au cas où

  const reponse = await fetch("https://test-technique-axa-api.onrender.com/api/devis");
  const devis = await reponse.json();

  if (!devis.length) {
    const ligne = document.createElement("tr");
    ligne.innerHTML = `
      <td colspan="4" style="text-align: center">
        <div style="display: flex; align-content: center; flex-wrap: wrap; flex-direction: column;">
          <img
            class="fit-picture"
            src="empty-data.png"
            alt="data empty"
          />
          Aucun devis établis
        </div>
      </td>
      `;

    tbody.appendChild(ligne);
  } else {
    devis.forEach((opp) => {
      const ligne = document.createElement("tr");
      ligne.innerHTML = `
      <td>${opp.numero_opportunite}</td>
      <td>${opp.nom_client}</td>
      <td>${opp.cout_ouvrage}</td>
      <td>
        <a href="https://test-technique-axa-api.onrender.com/api/devis/${opp.id}/pdf" target="_blank">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </a> | 
        <a href="https://test-technique-axa-api.onrender.com/api/devis/${opp.id}/word" target="_blank">
          <i class="fa-solid fa-file-word"></i> W
        </a>
      </td>
      `;

      tbody.appendChild(ligne);
    });
  }
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

  fetch("https://test-technique-axa-api.onrender.com/api/devis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      console.log("Réponse de l'API :", result);
      document.location.href = "https://ryodes.github.io/test-technique-axa-frontend/";
      alert("Devis envoyé avec succès !");
    })
    .catch((err) => {
      console.error(err);
      alert("Erreur lors de l'envoi du formulaire.");
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      return res.json();
    });
});
