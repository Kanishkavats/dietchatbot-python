export interface Cause {
  id: number;
  title: string;
  date: string;
  image: string;
}

export interface DonationCardProps {
  icon?: string; // Replaces icon
  subtitle: string;
  title: string;
  buttonText: string;
  onButtonClick?: () => void;
  backgroundImage: string;
}

export interface TagListProps {
  tags: string[];
  onClick?: (tag: string) => void;
}