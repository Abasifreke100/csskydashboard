export const getInitials = (role: string): string => {
  const words = role.split(" ");
  const relevantWords = words.length > 2 ? words.slice(0, 2) : words;
  return relevantWords.reduce((accumulator, currentValue) => accumulator + currentValue.charAt(0).toUpperCase(), "");
};
