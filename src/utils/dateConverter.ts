export const dateConverter = (date: string | null) => {
  if (!date) return null;

  const dateParts = date.split('.');

  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return formattedDate;
};
