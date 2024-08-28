import { format, formatDistanceToNow } from 'date-fns';

// FORMAT: August 28, 2024
export const formatDate = (dateString: string | number | Date) => {
  return format(new Date(dateString), 'MMMM dd, yyyy');
};

// FORMAT:  "Time Ago"
export const formatTimeAgo = (dateString: string | number | Date) => {
  return `${formatDistanceToNow(new Date(dateString))} ago`;
};
