export interface Comment {
  id: string;
  name: string;
  comment: string;
  createdAt?: string;
}

export interface CommentColumnCallbacks {
  onEdit: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
  onView: (comment: Comment) => void;
}
