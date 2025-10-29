// --- Modals Bootstrap ---
 const addModal = new bootstrap.Modal(document.getElementById('AjoutReservation'));
 //const editModal = new bootstrap.Modal(document.getElementById('editReservationModal'));

 // --- Formulaires ---
 const addForm = document.getElementById('form-reservation');
// const editForm = document.getElementById('editReservationForm');

 // --- Variables globales ---
 let daySelectionne = null;
 let ReservationSelectionne = null;

// --- Sélection des jours actifs  ---
 const days = document.querySelectorAll('.day:not(.inactive)');

// --- Ouvrir le modal d’ajout sur clic d’un jour Sans utilisation de boutton ---
days.forEach(day => {
  day.addEventListener('click', () => {
    daySelectionne = day;
    addModal.show();
  });
});

 // --- l'Envoi  du formulaire d’ajout ---

addForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // Récupération des données
  const name = document.getElementById('name').value.trim();
  const Debut = document.getElementById('Debut').value;
  const fin = document.getElementById('fin').value;
  const personne = document.getElementById('nbpersonne').value;
  const type = document.getElementById('typeReservation').value;

  if (!name || !Debut || !fin || !personne || !type) {
    alert("Veuillez remplir tous les champs svp !");
    return;
  }

  // Création du bloc réservation

  const reservation = document.createElement('div');
  reservation.classList.add('reservation', type);
  reservation.innerHTML = `Name :
    <strong>${name}</strong><br>
    Date Reservation :
    ${Debut} - ${fin}<br>
    Nombre de pers :${personne} .
  `;

  // Sauvegarde dans dataset

  reservation.dataset.name = name;
  reservation.dataset.Debut = Debut;
  reservation.dataset.fin = fin;
  reservation.dataset.personne = personne;
  reservation.dataset.type = type;

  // Clic sur la réservation → ouvrir le modal d'édition

  reservation.addEventListener('click', (e) => {
    e.stopPropagation(); // éviter de rouvrir le modal d’ajout parent 
    openEditModal(reservation);
  });

  daySelectionne.appendChild(reservation);
  addForm.reset();
  addModal.hide();
});

// // --- Ouvrir le modal d’édition ---
// function openEditModal(reservation) {
//   ReservationSelectionne = reservation;

//   document.getElementById('editName').value = reservation.dataset.name;
//   document.getElementById('editDebut').value = reservation.dataset.Debut;
//   document.getElementById('editFin').value = reservation.dataset.fin;
//   document.getElementById('editNbPersonne').value = reservation.dataset.personne;
//   document.getElementById('editTypeReservation').value = reservation.dataset.type;

//   editModal.show();
// }

// // --- Sauvegarder les modifications ---
// editForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   ReservationSelectionne.dataset.name = document.getElementById('editName').value.trim();
//   ReservationSelectionne.dataset.Debut = document.getElementById('editDebut').value;
//   ReservationSelectionne.dataset.fin = document.getElementById('editFin').value;
//   ReservationSelectionne.dataset.personne = document.getElementById('editNbPersonne').value;
//   ReservationSelectionne.dataset.type = document.getElementById('editTypeReservation').value;

//   ReservationSelectionne.className = `reservation ${ReservationSelectionne.dataset.type}`;
//   ReservationSelectionne.innerHTML = `
//     <strong>${ReservationSelectionne.dataset.name}</strong><br>
//     ${ReservationSelectionne.dataset.Debut} - ${ReservationSelectionne.dataset.fin}<br>
//     ${ReservationSelectionne.dataset.personne} pers.
//   `;

//   editModal.hide();
// });

// // --- Supprimer la réservation ---
// document.getElementById('deleteReservation').addEventListener('click', () => {
//   if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
//     ReservationSelectionne.remove();
//     editModal.hide();
//   }
// });
