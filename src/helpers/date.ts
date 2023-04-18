export function generateDate(dateString: string): Date {
  const date = new Date(`${dateString}:00:00:00`);
  return date;
}

export function generateDateForm(dateMiliseconds: number) {
  const date = new Date(dateMiliseconds).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return date;
}
