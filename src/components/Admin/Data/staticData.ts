export interface Campaign {
  id: number;
  title: string;
  category: string;
  description: string;
  goalAmount: number;
  summary: string;
  keyPoints: string;
  organizer: string;
  raisedAmount: number;
  status: string;
  startDate: string;
  endDate: string;
  images?: (string | File)[];
  imageUrl?: string[]; 
  location: string;
}

export const CampaignSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Organizer", value: "organizer" },
  { label: "Category", value: "category" },
] as const;

export const CategorySearchOptions = [
  { label: "Name", value: "name" },
] as const;

export interface Blog {
  id: number;
  creator:string;
  title: string;
  description: string;
  summary: string;
  quote: string;               
  quoteAuthor: string;         
  category: string;            
  content: string;
  author: string;
  tags?: string[];             
  keyPoints?: string[];        
  location: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt?: string;
  images?: (string | File)[];  
  imageUrl?: string[];         
}


export const BlogSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Category", value: "category" },
  { label: "Location", value: "location" },
  { label: "CreatedAt", value: "createdAt" },
  { label: "UpdatedAt", value: "updatedAt" },
] as const;


export const CommentSearchOptions = [
  { label: "Status", value: "status" },

]