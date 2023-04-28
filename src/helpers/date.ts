export function generateDate(dateString: string): Date {
  return new Date(`${dateString}:00:00:00`);
}

export function generateDateForm(dateMiliseconds: number) {
  return new Date(dateMiliseconds).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}
