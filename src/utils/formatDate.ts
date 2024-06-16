export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      return ''; // Handle invalid dates gracefully if needed
    }
    
    // Format the date into DD/MM/YYYY format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  