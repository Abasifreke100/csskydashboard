import { format, formatDistanceToNow } from 'date-fns';

// FORMAT: August 28, 2024
export const formatDate = (dateString: string | number | Date) => {
  return format(new Date(dateString), 'MMMM dd, yyyy');
};

// FORMAT:  "Time Ago"
export const formatTimeAgo = (dateString: string | number | Date) => {
  return `${formatDistanceToNow(new Date(dateString))} ago`;
};


// FORMAT: 12/10/2023
export const formatDateManually = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
