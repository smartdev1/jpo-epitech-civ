import type { Fragment } from '@/types/game'

export const FRAGMENTS: Fragment[] = [
  {
    id: 1,
    key: 'CODE',
    title: 'Fragment I — Communication',
    type: 'charade',
    prompt:
      "Mon premier est une boisson chaude très appréciée des développeurs.\nMon deuxième est la troisième lettre de l'alphabet.\nMon tout permet de communiquer avec un ordinateur.",
    answer: 'CODE',
    successPercent: 20,
    hint: 'Là où les objets disparaissent sans jamais vraiment revenir,\nune nouvelle piste attend les plus curieux.',
  },
  {
    id: 2,
    key: 'PROGRAMME',
    title: 'Fragment II — Instructions',
    type: 'images',
    prompt: 'Quatre images, un seul mot. Observez-les attentivement.',
    images: [
      { icon: '🖥️', label: 'écran ordinateur' },
      { icon: '📅', label: 'calendrier' },
      { icon: '▶️', label: 'bouton lecture' },
      { icon: '🧑‍💻', label: 'développeur devant un ordinateur' },
    ],
    answer: 'PROGRAMME',
    successPercent: 40,
    hint: "Certains gardent l'eau fraîche,\nd'autres les secrets.",
  },
  {
    id: 3,
    key: 'BUG',
    title: 'Fragment III — Anomalie',
    type: 'riddle',
    prompt:
      'Je ne suis jamais invité.\nPourtant je finis toujours par apparaître.\nLes développeurs passent leurs journées\nà essayer de me faire disparaître.\nQui suis-je ?',
    answer: 'BUG',
    successPercent: 60,
    hint: 'Ce qui réchauffe parfois les repas\nne réchauffera pas forcément votre piste...\nregardez autrement.',
  },
  {
    id: 4,
    key: 'LANGAGE',
    title: 'Fragment IV — Rébus',
    type: 'rebus',
    prompt: 'Assemblez les symboles pour révéler le mot caché.',
    rebus: ['🗣️', '💻'],
    answer: 'LANGAGE',
    successPercent: 80,
    hint: "Certains ouvrent des portes avec une clé.\nD'autres cachent davantage sous ce qu'ils soutiennent.",
  },
  {
    id: 5,
    key: 'ALGORITHME',
    title: 'Fragment V — Logique',
    type: 'logic',
    prompt:
      "Je suis une suite d'étapes.\nSans moi,\nGoogle ne chercherait rien.\nLes GPS seraient perdus.\nLes robots seraient immobiles.\nQui suis-je ?",
    answer: 'ALGORITHME',
    successPercent: 100,
    hint: 'Dernier fragment retrouvé.\nLe système est presque restauré.\nScannez le dernier QR Code.',
  },
]

export function getFragmentById(id: number): Fragment | undefined {
  return FRAGMENTS.find((f) => f.id === id)
}
