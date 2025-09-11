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
  images?: (string | File)[]; // will send from frontend
  imageUrl?: string[]; // will come from backend
  location: string;
}

export const initialCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Food for Flood Victims",
    organizer: "Relief Org",
    category: "Charity",
    description: "Providing essential food supplies to flood victims.",
    goalAmount: 50000,
    raisedAmount: 32000,
    summary: "A campaign to help flood-affected families.",
    keyPoints: JSON.stringify(["Immediate relief", "Community support"]),
    status: "Active",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    images: [""],
    location: "New York, USA",
  },
  {
    id: 2,
    title: "School Supplies Drive",
    organizer: "Community Helpers",
    category: "Education",
    description: "Distributing school supplies to underprivileged children.",
    goalAmount: 20000,
    raisedAmount: 20000,
    summary: "Helping kids get ready for school with proper supplies.",
    keyPoints: JSON.stringify(["Notebooks", "Stationery kits"]),
    status: "Completed",
    startDate: "2025-08-01",
    endDate: "2025-08-15",
    images: [""],
    location: "San Francisco, USA",
  },
];

export const CampaignSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Organizer", value: "organizer" },
  { label: "Category", value: "category" },
] as const;


export const campaignCategories = [
  { label: "Food", value: "Food" },
  { label: "Education", value: "Education" },
  { label: "Health", value: "Health" },
  { label: "Technology", value: "Technology" },
]