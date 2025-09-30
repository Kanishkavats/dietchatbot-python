export interface TeamMember {
  img: string;
  id: number;
  name: string;
  role: string;
  delay: number;
}

export interface VolunteerCardProps {
  member: TeamMember;
  idx: number;
  
}