export interface TeamMember {
  img: string;
  id: number;
  name: string;
  role: string;
  delay: number;
  imageUrl?: string;
  image?: string;
  position: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  behanceUrl?: string;
  vimeoUrl?: string;
  linkedInUrl?: string;
  about?: string;

}

export interface VolunteerCardProps {
  member: TeamMember;
  idx: number;

  
}