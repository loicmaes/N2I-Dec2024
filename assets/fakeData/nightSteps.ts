import type { NightStep } from "~/types/nightStep";

export default [
  {
    step: 1,
    time: new Date("Dec, 5 2024 16:39"),
    title: "Début de la nuit",
    description: "Les organisateurs présentent l'événement et distribuent les sujets. Après quoi les participants prennent le temps de découvrir les défis proposés pour la nuit et de choisir les 5 défis en plus de celui de la nuit qu'ils souhaitent essayer de relever au mieux.",
  },
  {
    step: 2,
    time: new Date("Dec, 6 2024 8:04"),
    title: "Fin de la nuit",
    description: "Si les livrables n'ont pas été rendus : trop tard. L'horloge a sonné la fin de la nuit, il est l'heure de reprendre nos vies comme si cette nuit n'avait été qu'une autre nuit passionnée à travailler sur un projet passionnant.",
  },
] as NightStep[];
