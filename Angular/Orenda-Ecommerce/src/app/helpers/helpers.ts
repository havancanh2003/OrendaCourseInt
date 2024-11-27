export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? '0' + day : day}/${
    month < 10 ? '0' + month : month
  }/${year}`;
  return formattedDate;
}
