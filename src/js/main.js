// ---  Declaration des Modals Bootstrap ---

 const addModal = new bootstrap.Modal(document.getElementById('AjoutReservation'));
 const editModal = new bootstrap.Modal(document.getElementById('modifierReservation'));
 const RechercheInput = document.getElementById("search");

 // ---Declaration des  Formulaires ---

 const addForm = document.getElementById('form-reservation');
 const editForm = document.getElementById('editReservationForm');


 // --- Variables globales ---

 let jourSelectionne = null;
 let ReservationSelectionne = null;

// --- Sélection des jours actifs (Lundi - Vendredi) ---

 const days = document.querySelectorAll('.day:not(.inactive)');

// --- Ouvrir le modal d’ajout sur clic d’un jour Sans utilisation de boutton ---

days.forEach(day => {
    day.addEventListener('click' , () =>{
        jourSelectionne = day ;
        addModal.show();
    });
});
 
 // --- Remplire la form et  l'Envoi  du formulaire d’ajout ---

addForm.addEventListener('submit', (e) => {
   e.preventDefault(); // ----> annule l'événement s'il est annulable

   const name = document.getElementById('name').value.trim();
   const Debut = document.getElementById('Debut').value;
   const fin = document.getElementById('fin').value;
   const personne = document.getElementById('nbpersonne').value;
   const type = document.getElementById('typeReservation').value;

    if (!name || !Debut || !fin || !personne || !type) {
        alert("Veuillez remplir tous les champs svp !");
        return;
    }

  // Création du bloc réservation (Affichage) 
    // innerHTML = permet la manipulation dynamique du contenu HTML d'un élément.

    const reservation = document.createElement('div');
    reservation.classList.add('reservation', type);
    reservation.innerHTML = `Nom :
        <strong>${name}</strong><br>
        Date Reservation :
        ${Debut} - ${fin}<br>
        Nombre de personne :${personne} .
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

  jourSelectionne.appendChild(reservation);
  addForm.reset(); // Réinitialise les champs du formulaire addForm
  addModal.hide(); // fermer la forme de l'ajout 
});

 // --- Ouvrir le modal de modification ---

    function openEditModal(reservation) {
        ReservationSelectionne = reservation;
        document.getElementById('ModifNon').value = reservation.dateset.name;
        document.getElementById('editDebut').value = reservation.dataset.Debut;
        document.getElementById('editfin').value = reservation.dataset.fin;
        document.getElementById('editNbPersonne').value = reservation.dataset.personne;
        document.getElementById('editTypeReservation').value =reservation.dataset.type;

       editModal.show();
    }

// --- Sauvgarder les modifications ------
