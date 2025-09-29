export interface Feedback {
  id: string;
  name: string;
  designation: string;
  imageUrl?: Record<string, any> | null; 
  feedback: string;
  rating: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
}

export interface FeedbackColumnCallbacks {
  onEdit: (feedback: Feedback) => void;
  onDelete: (feedback: Feedback) => void;
  onView: (feedback: Feedback) => void;
}