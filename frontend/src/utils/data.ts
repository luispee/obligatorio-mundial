export function formatDate(date: string): string {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
}
