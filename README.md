# MISSION EPITECH_VOID

PWA Escape Game pour la Journée Portes Ouvertes EPITECH. Une IA fragmentée en 5 concepts informatiques (`CODE`, `PROGRAMME`, `BUG`, `LANGAGE`, `ALGORITHME`) doit être restaurée en résolvant des énigmes déclenchées par des QR Codes disposés dans la salle. 100% front-end : aucune API, toute la progression est persistée dans le `localStorage` du navigateur.

## Stack

Vue 3 + TypeScript + Vite, Vue Router, Pinia, Tailwind CSS v4, `vite-plugin-pwa`, `html5-qrcode` (scan), `qrcode` (génération).

## Démarrer

```sh
npm install
npm run dev
```

## Préparer la salle

1. Générer/imprimer les QR Codes : ouvrir `/admin/qrcodes` dans l'app déployée (bouton Imprimer). Un QR par checkpoint (`checkpoint/001` à `checkpoint/005` pour les fragments, `checkpoint/006` pour la reconstruction finale).
2. Disposer les QR dans l'ordre de progression attendu dans la salle.
3. Build de production avant le jour J :

```sh
npm run build
npm run preview
```

## Parcours de jeu

`/` (splash) → `/equipe` (création d'équipe) → `/mission` (dashboard, scan des QR via le bouton caméra) → `/fragment/:id` (énigme) → … → `/final` (reconstruction du mot final) → `/victoire`.

La progression (équipe, fragments trouvés, tentatives, temps, validation finale) est stockée sous la clé `epitech-void-save` du `localStorage`. Un bouton « Réinitialiser la mission » sur le dashboard permet de recommencer une partie.

## Icônes PWA

Le logo source est `public/icons/source.svg`. Pour régénérer les PNG (`icon-192`, `icon-512`, `icon-maskable-512`, `apple-touch-icon`) après une modification :

```sh
npm run generate-icons
```
