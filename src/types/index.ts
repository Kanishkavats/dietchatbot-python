export interface TeamMember {
  img: string;
  id: number;
  name: string;
  role: string;
  delay: number;
  imageUrl?: string;
  image?: string;
  position: string;
  

}

export interface VolunteerCardProps {
  member: TeamMember;
  idx: number;

  
}