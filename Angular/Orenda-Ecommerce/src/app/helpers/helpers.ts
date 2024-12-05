export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateToYYYYMMDD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function getCookie(name: any) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function clearToken(): void {
  document.cookie = 'access_token=; max-age=0; path=/';
}
export function concatenate(
  wardName: string,
  districtName: string,
  provinceName: string
): string | null {
  if (wardName != null && districtName != null && provinceName != null) {
    return `${wardName} - ${districtName} - ${provinceName}`;
  }
  return null;
}

export enum TYPE_ACTION {
  CREATE = 'create',
  UPDATE = 'update',
}
