#Le Gourmet — Planification des Réservations
##Description du Projet
**Gourmet** est une plateforme web  permettant au utilisateurs de gérer des réservations dans un planning interactif. 
L’utilisateur peut ajouter, modifier et supprimer des réservations sur les différents 7 jours et horaires,  
et toutes les données sont automatiquement sauvegardées dans **LocalStorage** afin de rester visibles même après rechargement de la page .
##Fonctionamitées 
- Ajouter une réservation dans une cellule   
- Modifier une réservation existante avec modal Bootstrap  
- Supprimer une réservation (avec confirmation)    
- Sauvegarde dans **LocalStorage**  
- Rechargement automatique des réservations à l’ouverture de la page  
- Interface adaptée aux types de réservation (couleurs différentes)

##Technologies Utilisées

- **HTML5** :Pour la Structure du calendrier 
- **CSS3** : Pour le  Style du tableau et  blocs réservation 
- **JavaScript**:  (DOM + LocalStorage) 
- **Bootstrap 5** :  Modal d'ajout et Modal de modification 


##Comment utilisées 

️- Cliquez sur un créneau disponible️
- Remplissez le formulaire dans la modale d’ajout️
- Cliquez sur une réservation pour la modifier ou la supprimer

##Structure des données sauvegardée dans local storage

Chaque réservation est stockée  :

```json
{
  "id": 2222222222333,
  "name": "maryem",
  "Debut": "09:00",
  "fin": "12:00",
  "personne": "3",
  "type": "vip",
  "day": "lundi"
}