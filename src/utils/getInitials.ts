export const getInitials = (role: string): string => {
    const words = role.split(" ");
    return words.reduce((accumulator, currentValue) => accumulator + currentValue.charAt(0).toUpperCase(), "");
  };