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

    const reservationId = Date.now();
    reservations.push({
        id: reservationId,
        name,
        Debut,
        fin,
        personne,
        type,
        day: celluleSelectionnee.dataset.day
    });
    // Créer élément DOM
    const reservation = creerReservation(name, Debut, fin, personne, type, reservationId);

    placerReservation(reservation, celluleSelectionnee.dataset.day, Debut);
    addReservationToLocalStorage();
    afficherReservations();
    addForm.reset();
    addModal.hide();
});

// --- Fonction qui crée une réservation ---

function creerReservation(name, Debut, fin, personne, type) {
    const reservation = document.createElement('div');
    reservation.className = `reservation ${type}`;
    reservation.dataset.name = name;
    reservation.dataset.Debut = Debut;
    reservation.dataset.fin = fin;
    reservation.dataset.personne = personne;
    reservation.dataset.type = type;
    reservation.dataset.id = id;

    function getMinutes(time) {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }
    const duree = getMinutes(fin) - getMinutes(Debut);
    reservation.style.height = `${duree}px`;
    // ajouter en fichier css 

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
    originalDebut = reservation.dataset.debut;

    document.getElementById('ModifNon').value = reservation.dataset.name;
    document.getElementById('editDebut').value = reservation.dataset.debut;
    document.getElementById('editFin').value = reservation.dataset.fin;
    document.getElementById('editNbPersonne').value = reservation.dataset.personne;
    document.getElementById('editTypeReservation').value = reservation.dataset.type;
}
// --- Sauvegarder modification ---

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Number(ReservationSelectionne.dataset.id);
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return;
    reservations[index].name = document.getElementById('ModifNon').value.trim();
    reservations[index].Debut = document.getElementById('editDebut').value;
    reservations[index].fin = document.getElementById('editFin').value;
    reservations[index].personne = document.getElementById('editNbPersonne').value;
    reservations[index].type = document.getElementById('editTypeReservation').value;

    addReservationToLocalStorage();
    afficherReservations();
    editModal.hide();
});

// --- Supprimer réservation ---

document.getElementById('SupReservation').addEventListener("click", () => {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?"))
        return;
    const id = Number(ReservationSelectionne.dataset.id);
    reservations = reservations.filter(r => r.id !== id);

    addReservationToLocalStorage();
    afficherReservations();
    editModal.hide();
});

// -- Enregistrer les donnes "Local Storage"--- 
let reservations = JSON.parse(localStorage.getItem("Reservations")) || [];
// conversion tableau → texte
function addReservationToLocalStorage() {
    localStorage.setItem("Reservations", JSON.stringify(reservations));
}
function afficherReservations() {
    // supprimer affichage ancien
    document.querySelectorAll(".reservation").forEach(el => el.remove());

    reservations.forEach(item => {
        const reservation = document.createElement("div");
        reservation.classList.add("reservation", item.type);

        reservation.dataset.name = item.name;
        reservation.dataset.Debut = item.Debut;
        reservation.dataset.fin = item.fin;
        reservation.dataset.personne = item.personne;
        reservation.dataset.type = item.type;
        reservation.dataset.id = item.id;

        reservation.innerHTML = `
            <strong>${item.name}</strong><br>
            ${item.Debut} - ${item.fin}<br>
            ${item.personne} personnes
        `;

        reservation.addEventListener("click", (e) => {
            e.stopPropagation();
            openEditModal(reservation);
        });

        const target = document.querySelector(
            `.day-cell[data-day="${item.day}"][data-hour="${item.Debut}"]`
        );

        if (target) target.appendChild(reservation);
    });
}
window.onload = afficherReservations;



