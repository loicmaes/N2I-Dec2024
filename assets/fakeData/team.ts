import type { TeamMember } from "~/types/team";

export default [
  {
    name: "Tom CZEKAJ",
    description: "L'intrépide introverti, il a le chique pour se mettre dans de beaux draps. Il n'écoute que la petite voix dans sa tête qui n'a pas l'air d'être bien réveillée. Mais, gard au dragon qui dort au fond de sa grotte, quand il se réveille, impossible de l'arrêter.",
    role: "Développeur Back-End",
    social: {
      github: "Xen0Xys",
      linkedin: "tom-czekaj",
    },
    favouriteColour: {
      code: {
        hex: "#FF0000",
        rgb: "255, 0, 0",
        hsl: "0, 0%, 100%",
      },
      name: "Rouge",
      compare: "le ciel, l'eau et ses draps",
    },
    mantra: "Kip It Simple, Stupid (KISS)",
    contact: {
      mail: "czekajtompro@gmail.com",
    },
    persona: {
      qualities: [
        "Efficace",
        "Réfléchi",
        "Réactif",
      ],
      flaws: [
        "Sourde oreille",
        "Borné",
        "Insistant",
      ],
    },
  },
  {
    name: "Loïc MAES",
    description: "Jeune homme intrépide qu'aucun domaine n'arrête. Apprendre : c'est sa drogue. On le décrit souvent comme : l'Extraterrestre. Pourquoi ? Il n'a besoin que de 3h de sommeil pour faire sa journée comme tout le monde... Sur-humain !",
    role: "Développeur Front-End",
    social: {
      web: "https://www.maesloic.fr/",
      github: "loicmaes",
      linkedin: "maesloic",
      instagram: "uiux.loicmaes",
    },
    favouriteColour: {
      code: {
        hex: "#000000",
        rgb: "0, 0, 0",
        hsl: "0, 0%, 0%",
      },
      name: "Noir",
      compare: "l'ombre, l'obscurité et son voisin",
    },
    mantra: "Kip It Simple, Stupid (KISS)",
    contact: {
      mail: "hello@maesloic.fr",
      phone: "+33388315386",
    },
    persona: {
      qualities: [
        "Con",
        "Intelligent",
        "Vif",
      ],
      flaws: [
        "Ne fini pas ses projets perso",
      ],
    },
  },
] as TeamMember[];
