Crée une Progressive Web App (PWA) mobile-first en Vue.js 3 + TypeScript destinée à une activité Escape Game organisée lors d’une Journée Portes Ouvertes EPITECH.

L’application doit être une expérience interactive immersive mélangeant :

* exploration physique dans une salle ;
* résolution d’énigmes ;
* découverte du monde informatique ;
* utilisation de QR Codes ;
* progression gamifiée.

L’objectif du joueur est de restaurer une intelligence artificielle dont le système a été fragmenté en cinq concepts informatiques. Les participants doivent retrouver chaque fragment grâce à des énigmes afin de reconstruire le mot final permettant de restaurer le système.

L’application doit fonctionner comme une vraie PWA installable sur smartphone, sans backend et sans base de données.

Utiliser uniquement le LocalStorage du navigateur pour sauvegarder :

* la progression ;
* les informations de l’équipe ;
* les fragments trouvés ;
* le nombre de tentatives ;
* le temps de jeu ;
* l’état de validation finale.

⸻

Stack technique obligatoire

Créer le projet avec :

* Vue.js 3
* TypeScript
* Vite
* Vue Router
* Pinia pour la gestion d’état locale
* Tailwind CSS pour le design
* vite-plugin-pwa pour le mode Progressive Web App
* animations avec CSS transitions, Vue Transition ou Motion
* bibliothèque QR Code compatible navigateur mobile (html5-qrcode ou équivalent)

L’application doit être responsive :

* smartphone en priorité ;
* tablette ;
* desktop.

⸻

Concept narratif

L’utilisateur est un agent recruté par une intelligence artificielle EPITECH.

Storytelling :

Une intelligence artificielle expérimentale a subi une panne critique.

Son cœur de fonctionnement a été fragmenté en cinq concepts fondamentaux de l’informatique.

Votre mission est de retrouver ces fragments cachés dans l’environnement afin de restaurer le système.

Chaque QR Code découvert dans la salle correspond à une étape de décryptage.

⸻

Direction artistique

Créer un univers :

* cyberpunk ;
* terminal informatique futuriste ;
* cybersécurité ;
* intelligence artificielle ;
* laboratoire technologique ;
* escape room numérique.

L’application doit ressembler à un jeu vidéo et non à un simple formulaire.

Palette

Fond :

* noir profond (#09090B)

Surfaces :

* bleu nuit (#111827)

Couleur principale :

* cyan électrique (#00E5FF)

Accent :

* violet néon (#8B5CF6)

Succès :

* vert lumineux (#22C55E)

Erreur :

* rouge (#EF4444)

Texte :

* blanc et gris clair

⸻

Animations globales

Ajouter :

* effet glitch léger ;
* lignes de scan ;
* pluie de caractères numériques discrète ;
* particules flottantes ;
* cartes avec effet holographique ;
* transitions fluides entre les écrans ;
* animations de décryptage ;
* effets de terminal avec texte qui apparaît progressivement ;
* vibrations mobiles lors des erreurs ;
* effets lumineux lors des réussites.

Les animations doivent être fluides et optimisées pour smartphone.

⸻

Structure de l’application

Écran 1 — Splash Screen

Créer une animation de démarrage.

Afficher :

INITIALISATION DU SYSTÈME...
Connexion au noyau EPITECH...
████████████ 100%
MISSION ACTIVÉE

Puis afficher :

Une intelligence artificielle est compromise.
5 fragments informatiques ont été dispersés.
Retrouvez-les afin de restaurer le système.

Bouton :

DÉMARRER LA MISSION

⸻

Écran 2 — Création de l’équipe

Avant de commencer demander :

* Nom de l’équipe
* Nombre de participants (3 à 6)

Sauvegarder dans LocalStorage.

Structure :

{
 "teamName":"",
 "players":0,
 "startTime":""
}

⸻

Écran 3 — Tableau de mission

Créer un dashboard futuriste.

Afficher :

MISSION IA
Progression système
■ ■ □ □ □
Fragments récupérés :
CODE
PROGRAMME
BUG
LANGAGE
ALGORITHME
Temps écoulé :
00:00

Chaque fragment non trouvé doit être verrouillé.

⸻

Gestion des QR Codes

Chaque QR Code contient un identifiant d’étape.

Exemple :

/checkpoint/001

Lorsqu’un QR Code est scanné :

Vérifier dans LocalStorage si cette étape correspond à la prochaine étape attendue.

Si oui :

ouvrir l’énigme.

Si non :

Afficher :

ACCÈS REFUSÉ
Ce fragment est encore verrouillé.
Continuez votre progression.

Ajouter une animation glitch rouge.

⸻

Les cinq fragments

Créer un système d’énigmes dynamique.

Chaque énigme possède :

* numéro ;
* titre ;
* type ;
* question ;
* réponse attendue ;
* indice suivant.

⸻

Fragment 1 — CODE

Type :

Charade

Question :

Mon premier est une boisson chaude très appréciée des développeurs.
Mon deuxième est la troisième lettre de l'alphabet.
Mon tout permet de communiquer avec un ordinateur.

Réponse :

CODE

Après réussite :

Animation :

FRAGMENT RETROUVÉ
CODE
20% du système restauré

Indice :

Là où les objets disparaissent sans jamais vraiment revenir,
une nouvelle piste attend les plus curieux.

⸻

Fragment 2 — PROGRAMME

Type :

4 images → 1 mot

Images :

* écran ordinateur ;
* calendrier ;
* bouton lecture ;
* développeur devant un ordinateur.

Réponse :

PROGRAMME

Indice :

Certains gardent l'eau fraîche,
d'autres les secrets.

⸻

Fragment 3 — BUG

Type :

Énigme

Question :

Je ne suis jamais invité.
Pourtant je finis toujours par apparaître.
Les développeurs passent leurs journées
à essayer de me faire disparaître.
Qui suis-je ?

Réponse :

BUG

Indice :

Ce qui réchauffe parfois les repas
ne réchauffera pas forcément votre piste...
regardez autrement.

⸻

Fragment 4 — LANGAGE

Type :

Rébus

Créer un rébus :

🗣️ + 💻

Réponse :

LANGAGE

Indice :

Certains ouvrent des portes avec une clé.
D'autres cachent davantage sous ce qu'ils soutiennent.

⸻

Fragment 5 — ALGORITHME

Type :

Énigme logique

Question :

Je suis une suite d'étapes.
Sans moi,
Google ne chercherait rien.
Les GPS seraient perdus.
Les robots seraient immobiles.
Qui suis-je ?

Réponse :

ALGORITHME

Indice final :

Dernier fragment retrouvé.
Le système est presque restauré.
Scannez le dernier QR Code.

⸻

Dernière étape — Reconstruction du système

IMPORTANT :

Le mot final ne doit JAMAIS apparaître avant cette étape.

Après scan du QR Code final afficher :

Animation :

ANALYSE DES FRAGMENTS...
5 fragments détectés.

Afficher un formulaire demandant au joueur de saisir les cinq mots :

Fragment 1 :
[____________]
Fragment 2 :
[____________]
Fragment 3 :
[____________]
Fragment 4 :
[____________]
Fragment 5 :
[____________]

Bouton :

ANALYSER LES FRAGMENTS

⸻

Validation finale

Comparer les réponses saisies avec :

CODE
PROGRAMME
BUG
LANGAGE
ALGORITHME

Accepter :

* majuscules/minuscules différentes ;
* espaces inutiles.

Si erreur :

Afficher :

ANALYSE INCOMPLÈTE
Certains fragments sont incorrects.
Réessayez.

⸻

Révélation finale

Uniquement après validation correcte :

Créer une grande animation :

CODE ........ OK
PROGRAMME ... OK
BUG ......... OK
LANGAGE ..... OK
ALGORITHME .. OK

Puis :

CONNEXION AU NOYAU CENTRAL...

Animation de reconstruction.

Enfin révéler :

SYSTÈME RESTAURÉ
Le concept final est :
LOGICIEL

Créer une animation spectaculaire :

* explosion lumineuse ;
* particules numériques ;
* pluie de code ;
* écran de victoire.

Message final :

MISSION ACCOMPLIE
Félicitations agents.
Bienvenue dans l'univers EPITECH.

⸻

LocalStorage

Utiliser une structure claire :

{
 "team": {},
 "currentStep":1,
 "fragmentsFound":[],
 "attempts":0,
 "startTime":"",
 "completed":false,
 "finalValidated":false
}

Prévoir une fonction de reset permettant de recommencer une partie.

⸻

Objectif final

Créer une PWA Escape Game immersive, moderne et ludique donnant aux visiteurs l’impression de participer à une véritable mission informatique.

L’expérience doit valoriser :

* la logique ;
* la programmation ;
* l’innovation ;
* la créativité ;
* l’esprit EPITECH.

L’application doit être suffisamment propre et réutilisable pour être utilisée pendant toute la Journée Portes Ouvertes.