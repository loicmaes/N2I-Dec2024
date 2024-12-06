export type TeamRole = "Développeur Front-End" | "Développeur Back-End";

export interface TeamMember {
  avatar?: string;
  name: string;
  description: string;
  mantra?: string;
  role: TeamRole;
  social?: {
    web?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  favouriteColour?: {
    code: {
      hex: string;
      rgb: string;
      hsl: string;
    };
    name: string;
    compare: string;
  };
  contact?: {
    mail: string;
    phone?: string;
  };
  persona: {
    qualities: string[];
    flaws: string[];
  };
}
