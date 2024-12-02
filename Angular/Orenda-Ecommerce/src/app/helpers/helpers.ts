export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
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
  provinceId: string,
  districtId: string,
  wardId: string
): string {
  return `${provinceId}-${districtId}-${wardId}`;
}

export function cutConcatenate(idAdd: string) {
  const parts = idAdd.split('-');

  if (parts.length !== 3) {
    throw new Error(
      'Chuỗi không hợp lệ. Cần có ba phần: provinceId-districtId-communeId'
    );
  }

  return {
    provinceId: parts[0],
    districtId: parts[1],
    wardId: parts[2],
  };
}

export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
