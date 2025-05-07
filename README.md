# Projet RH et Employé
## Sommaire
- Description
- Diffèrentes functionalité avec des captures d'ecrant
  - Gestion des enseignant
  - Gestion des congés
  - Auth
- l'avenir du projets

## Description
Ce projet sert à répondre au cahier de charge proposé par monsieur Lazher.

Ce projet est une application web entière ayant comme frontend React +Mui et comme backend Quarkus Java, développé par Mohamed Aziz Ouni et Mohamed Yassine Kharrat

🔴: Admin et Personnel RH<br>
🔵: Les utilisateurs normals

## Differentes functionalités
### Gestion des enseignants
#### Ajouter l'enseignant 🔴
On peut ajouter un enseignant à la BDD, ce qui va envoyer un email, décrivant comment peut-il activer son compte.

![feature 1.gif](feature%201.gif)

#### Ajouter des handicappes 🔵🔴
Lors de l'ajout de l'enseignant, parfois on n'a pas un enregistrement de son handicap.
Pas de soucis car on peut l'ajouter en suivant les étapes décrits dans le vidéo ci-dessous.

![feature 2.gif](feature%202.gif)

#### Trier et filtrer les enregistrements 🔴
Le tableau affichant lea enseignants nous permets de les trier et les filtrer suivant des critères.

![feature 3.gif](feature%203.gif)

#### Afficher detailles enseignant 🔴
Bienque le tableau affiche plusieurs colonnes, il y a aussi d'autres qu'on ne peut pas visualiser dans un tableau simple.
Hereusement, en cliquant sur une ligne, on est redirigé vers une page détaillant l'enseignant ayant été sélectionné.

![feature 4.gif](feature%204.gif)

L'enseignant peut même consulter ses propres information

![feature 4.2.gif](feature%204.2.gif)

#### Modifier les détailles 🔴🔵
On peut modifier les détailles de chaque enseignant comme affiché dans le vidéo ci-dessous.

![feature 8.2.gif](feature%208.2.gif)

L'enseignant lui-même peut modifier ses propres informations lors de sa connexion

![feature 8.gif](feature%208.gif)

#### Exporter l'état du congé de l'enseignant 🔴
On clique sur le 1er bouton à coté de l'entête "Congé". Cela va ouvrir un dialogue affichant un aperçu sur l'etat du congé de l"enseignant selectionné

![feature 5.gif](feature%205.gif)

#### Ajouter le solde d'un enseignant 🔴
Pour le moment, on peut ajouter le solde du congé d'un enseignant à cause de la contrainte du temps. Sinon, cette fonctionnalité n'est réservé que pour les employés.
On a juste implementé ça pour l'enseignant uniquement pour l'inclure dans notre projet.

![feature 6.gif](feature%206.gif)

#### Supprimer un enseignant
On peut également supprimer un enseignant

![feature 11.gif](feature%2011.gif)

### Gestion des congés
#### Afficher les demandes du congé 🔴🔵
L'admin (et le personnel RH) peut afficher les demandes du congé de tout le monde

![feature 7.1.gif](feature%207.1.gif)

Tandis que les autres ne peuvent consulter que leur propres demandes

![feature 7.2.gif](feature%207.2.gif)

#### Ajouter une demande du congé 🔴🔵
Tout le monde peut ajouter une demande du congé
Par exemple, le vidéo ci-dessous montre comment Jena va demander un congé
Notre système prends en compte les jours fériers suivant les calendriers Grégorienne et Hijri

![feature 9.gif](feature%209.gif)

#### Accepter ou réfuser le congé 🔴
Si l'admin (ou RH) n'était pas connecté lors de la demande, la notification sera enregistré
dans la base de données jusqu'à la première connexion de l'admin

![feature 10.gif](feature%2010.gif)

Maintenant, Jenah va reçevoire la mauvaise nouvelle

![feature 10.2.gif](feature%2010.2.gif)

### Auth
#### Activation compte 🔴🔵
Après avoir été ajouté par l'admin (ou le RH), 
notre enseignant (ou employé) va reçevoir un mail pour activer son compte

Sinon, son "status" restera **inactif**

Voici le parcours de l'activation du compte

![feature 12.1.gif](feature%2012.1.gif)

Maintenant, son "status" sera **actif**

![feature 12.2.gif](feature%2012.2.gif)

#### Login 🔴🔵
C'est déjà montré dans les vidéos précédantes
Voici qu'est ce que se passe si on saisie des données erronés

![feature 13.gif](feature%2013.gif)

#### Mot de passe oublié 🔴🔵
Pour réinitialiser le mot de passe, on doit suivre la démarche suivante:
(Dans le cas où il a déjà envoyé un mail de réinitialisation de mote de passe, il va
le signaler en affichant une notification)

![feature 14.gif](feature%2014.gif)

## L'avenir du projet
Ce projet est ambitieux. Il y a beaucoups des détails cachés dans le backend, assurant les fonctionnalités mentionnées.
On vise à mettre ces détails en lumière, en ajoutant les functionalités suivantes au frontend:
CRUD des jours feriers
CRUD des Grad d'enseignant
CRUD des types de congé
CRUD des emploi du temps

À part ça, on peut aussi implementer les fonctionnalités restantes citées par le cahier de charge.