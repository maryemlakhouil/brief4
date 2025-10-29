// --- Modals Bootstrap ---
 const addModal = new bootstrap.Modal(document.getElementById('AjoutReservation'));
 const editModal = new bootstrap.Modal(document.getElementById('editReservationModal'));

// // --- Formulaires ---
// const addForm = document.getElementById('form-reservation');
// const editForm = document.getElementById('editReservationForm');

// // --- Variables globales ---
// let selectedDay = null;
// let selectedReservation = null;

// // --- Sélection des jours actifs ---
// const days = document.querySelectorAll('.day:not(.inactive)');

// // --- Ouvrir le modal d’ajout sur clic d’un jour ---
// days.forEach(day => {
//   day.addEventListener('click', () => {
//     selectedDay = day;
//     addModal.show();
//   });
// });

// // --- Soumission du formulaire d’ajout ---
// addForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // Récupération des données
//   const name = document.getElementById('name').value.trim();
//   const start = document.getElementById('Debut').value;
//   const end = document.getElementById('fin').value;
//   const people = document.getElementById('nbpersonne').value;
//   const type = document.getElementById('typeReservation').value;

//   if (!name || !start || !end || !people || !type) {
//     alert("Veuillez remplir tous les champs !");
//     return;
//   }

//   // Création du bloc réservation
//   const reservation = document.createElement('div');
//   reservation.classList.add('reservation', type);
//   reservation.innerHTML = `
//     <strong>${name}</strong><br>
//     ${start} - ${end}<br>
//     ${people} pers.
//   `;

//   // Sauvegarde dans dataset
//   reservation.dataset.name = name;
//   reservation.dataset.start = start;
//   reservation.dataset.end = end;
//   reservation.dataset.people = people;
//   reservation.dataset.type = type;

//   // Clic sur la réservation → ouvrir le modal d'édition
//   reservation.addEventListener('click', (e) => {
//     e.stopPropagation(); // éviter de rouvrir le modal d’ajout
//     openEditModal(reservation);
//   });

//   selectedDay.appendChild(reservation);
//   addForm.reset();
//   addModal.hide();
// });

// // --- Ouvrir le modal d’édition ---
// function openEditModal(reservation) {
//   selectedReservation = reservation;

//   document.getElementById('editName').value = reservation.dataset.name;
//   document.getElementById('editDebut').value = reservation.dataset.start;
//   document.getElementById('editFin').value = reservation.dataset.end;
//   document.getElementById('editNbPersonne').value = reservation.dataset.people;
//   document.getElementById('editTypeReservation').value = reservation.dataset.type;

//   editModal.show();
// }

// // --- Sauvegarder les modifications ---
// editForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   selectedReservation.dataset.name = document.getElementById('editName').value.trim();
//   selectedReservation.dataset.start = document.getElementById('editDebut').value;
//   selectedReservation.dataset.end = document.getElementById('editFin').value;
//   selectedReservation.dataset.people = document.getElementById('editNbPersonne').value;
//   selectedReservation.dataset.type = document.getElementById('editTypeReservation').value;

//   selectedReservation.className = `reservation ${selectedReservation.dataset.type}`;
//   selectedReservation.innerHTML = `
//     <strong>${selectedReservation.dataset.name}</strong><br>
//     ${selectedReservation.dataset.start} - ${selectedReservation.dataset.end}<br>
//     ${selectedReservation.dataset.people} pers.
//   `;

//   editModal.hide();
// });

// // --- Supprimer la réservation ---
// document.getElementById('deleteReservation').addEventListener('click', () => {
//   if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
//     selectedReservation.remove();
//     editModal.hide();
//   }
// });
