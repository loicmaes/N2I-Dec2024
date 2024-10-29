const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export function stringifyDate(date: Date): string {
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day} ${months[monthIndex].substring(0, 3)}. ${year} - ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
