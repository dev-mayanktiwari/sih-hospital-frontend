export const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const formatDateForBackend = (dateString) => {
  const now = new Date();
  const [year, month, day] = dateString.split("-");
  return new Date(
    year,
    month - 1,
    day,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ).toISOString();
};
