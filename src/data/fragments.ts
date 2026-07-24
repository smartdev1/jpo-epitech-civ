import type { Fragment } from '@/types/game'

export const FRAGMENTS: Fragment[] = [
  {
    id: 1,
    key: 'CODE',
    title: 'Fragment I — Communication',
    type: 'charade',
    prompt:
      "Levez les yeux: une instruction se cache ici. Les machines m'obeissent, les humains me lisent.",
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
      { iconKey: 'child', label: 'Un enfant devant un ordinateur' },
      { iconKey: 'codeScreen', label: 'Un écran avec du code' },
      { iconKey: 'robot', label: 'Un robot' },
      { iconKey: 'puzzle', label: 'Des blocs de programmation' },
    ],
    answer: 'PROGRAMME',
    successPercent: 40,
    hint: "Je  dors dans le mur, mais je reveille les machines. Cherchez-moi là où l'energie nourrit les écrans et fait vivre la technologie.",
  },
  {
    id: 3,
    key: 'BUG',
    title: 'Fragment III — Anomalie',
    type: 'riddle',
    prompt:
      'Je ne suis jamais invité.\nPourtant je finis toujours par apparaître.\nLes développeurs passent leurs journées\nà essayer de me faire disparaître. \nOn me traduit litteralement par insecte.\nQui suis-je ?',
    answer: 'BUG',
    successPercent: 60,
    hint: 'Ce qui réchauffe parfois les repas\nne réchauffera pas forcément votre piste...\nRegardez autrement. ',
  },
  {
    id: 4,
    key: 'LANGAGE',
    title: 'Fragment IV — Rébus',
    type: 'rebus',
    prompt: 'Assemblez les symboles pour révéler le mot caché.',
    rebus: ['speak', 'laptop'],
    answer: 'LANGAGE',
    successPercent: 80,
    hint: "Je suis caché sous un point d'eau, discrète mais utile. Dèrriere mes portes se trouvent peut-être les réponses que vous cherchez.",
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
    hint: 'Ouverte, j\'ai lancé votre aventure. Retournez-moi, et vous en trouverez la fin.',
  },
]

export function getFragmentById(id: number): Fragment | undefined {
  return FRAGMENTS.find((f) => f.id === id)
}
