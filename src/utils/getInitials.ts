export const getInitials = (name: string): string => {
  if (!name) return ""; // Handle undefined or empty name

  const words = name.split(" ");
  const relevantWords = words.length > 2 ? words.slice(0, 2) : words;
  return relevantWords.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.charAt(0).toUpperCase(),
    ""
  );
};
