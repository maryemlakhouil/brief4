// ---  Déclaration des Modals Bootstrap ---

const addModal = new bootstrap.Modal(document.getElementById('AjoutReservation'));
const editModal = new bootstrap.Modal(document.getElementById('modifierReservation'));
const RechercheInput = document.getElementById('search');

// --- Declaration des Formulaires ---

const addForm = document.getElementById('form-reservation');
const editForm = document.getElementById('editReservationForm');

// --- Variables Globales ---

let celluleSelectionnee = null;
let ReservationSelectionne = null;
let originalDebut = null; // Pour supprimer l'ancienne position si horaire modifié

// --- Clic sur une cellule horaire active -> Ajouter  ---

document.querySelectorAll('.day-cell:not(.inactive)').forEach(cell => {
    cell.addEventListener('click', () => {
        celluleSelectionnee = cell;
        document.getElementById('Debut').value = cell.dataset.hour;
        addModal.show();
    });
});

// --- Ajouter une réservation ---
 
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const Debut = document.getElementById('Debut').value;
    const fin = document.getElementById('fin').value;
    const personne = document.getElementById('nbpersonne').value;
    const type = document.getElementById('typeReservation').value;

    if (!name || !Debut || !fin || !personne || !type) {
        alert("Veuillez remplir tous les champs svp !");
        return;
    }

    if (Debut >= fin) {
        alert(" Logique dit que L'heure de fin doit être supérieure à  début !!!!!!");
        return;
    }

    const reservation = creerReservation(name, Debut, fin, personne, type);

    placerReservation(reservation, celluleSelectionnee.dataset.day, Debut);

    addForm.reset();
    addModal.hide();
});

// --- Fonction qui crée une réservation ---

function creerReservation(name, Debut, fin, personne, type) {
    const reservation = document.createElement('div');
    reservation.className = `reservation ${type}`;
    reservation.dataset.name = name;
    reservation.dataset.debut = Debut;
    reservation.dataset.fin = fin;
    reservation.dataset.personne = personne;
    reservation.dataset.type = type;

    const duree = (parseInt(fin) - parseInt(Debut)) * 60; // en minute 
    const hauteur = (duree / 60) * 60;  // en pixels 

    reservation.style.height = `${hauteur}px`; // ajouter en fichier css 
    reservation.innerHTML = `Nom :
        <strong>${name}</strong><br>
        Date Reservation<br>
        ${Debut} - ${fin}<br>
        ${personne} personne.
    `;

    reservation.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(reservation);
    });

    return reservation;
}

// --- Placer la réservation dans la bonne cellule ---

function placerReservation(reservation, day, Debut) {
    const target = [...document.querySelectorAll('.day-cell')]
    //transformer  l tableau bach n9dero nsta3mlo .find()
        .find(c => c.dataset.day === day && c.dataset.hour === Debut);
    if (!target) return;
    target.innerHTML = "";
    target.appendChild(reservation);
}

// --- Ouverture modal d’édition ---

 function openEditModal(reservation) {
        editModal.show();
        ReservationSelectionne = reservation;
        document.getElementById('ModifNon').value = reservation.dataset.name;
        document.getElementById('editDebut').value = reservation.dataset.Debut;
        document.getElementById('editFin').value = reservation.dataset.fin;
        document.getElementById('editNbPersonne').value = reservation.dataset.personne;
        document.getElementById('editTypeReservation').value =reservation.dataset.type;
    }
// --- Sauvegarder modification ---

 editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    ReservationSelectionne.dataset.name = document.getElementById('ModifNon').value.trim();
    ReservationSelectionne.dataset.Debut = document.getElementById('editDebut').value;
    ReservationSelectionne.dataset.fin = document.getElementById('editFin').value;
    ReservationSelectionne.dataset.personne = document.getElementById('editNbPersonne').value;
    ReservationSelectionne.dataset.type = document.getElementById('editTypeReservation').value;

    ReservationSelectionne.className = `reservation ${ReservationSelectionne.dataset.type}`;
    ReservationSelectionne.innerHTML = `Noveau name : 
        <strong>${ReservationSelectionne.dataset.name}</strong><br>
        ${ReservationSelectionne.dataset.Debut} - ${ReservationSelectionne.dataset.fin}<br>
        ${ReservationSelectionne.dataset.personne} personne.
    `;

    editModal.hide();
    });

// --- Supprimer réservation ---
document.getElementById('SupReservation').addEventListener('click', () => {
    if (confirm("Supprimer la réservation ?")) {
        ReservationSelectionne.remove();
        editModal.hide();
    }
});

            

