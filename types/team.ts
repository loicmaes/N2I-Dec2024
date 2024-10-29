export type TeamRole = "Développeur Front-End" | "Développeur Back-End";

export interface TeamMember {
  avatar?: string;
  name: string;
  role: TeamRole;
}
