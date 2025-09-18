export interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt?: string;
  status:string;
  approved?: boolean;
}

export interface CommentColumnCallbacks {
  onEdit: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
  onView: (comment: Comment) => void;
}
